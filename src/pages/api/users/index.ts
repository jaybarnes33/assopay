import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongo";
import User, { IUserSchema } from "@/models/User";
import getUserID from "@/utils/get-userID";

export type TUser = Pick<IUserSchema, "_id" | "level" | "campus"> & {
  name: string;
  paid: boolean;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<TUser[]>) => {
  try {
    await dbConnect();
    const { keyword, limit = 10, page = 1 } = req.query;
    const token = req.headers.authorization?.split(" ")[1] || "";

    const userID = getUserID(token);
    if (!userID) return res.status(401).end("Unauthorized!");

    const user = await User.findById(userID).select("-password");
    if (!user.isAdmin) return res.status(400).end("Only Admin");

    const users = await User.aggregate()
      .match(
        keyword
          ? {
              $text: {
                $search: keyword as string
              }
            }
          : {}
      )
      .project({
        level: 1,
        campus: 1,
        name: {
          $concat: ["$lastName", " ", "$firstName", " ", "$otherNames"]
        },
        paid: {
          $eq: [
            {
              $arrayElemAt: [
                { $split: [{ $arrayElemAt: ["$dues.year", 0] }, " - "] },
                0
              ]
            },
            new Date().getFullYear().toString()
          ]
        }
      })
      .limit(limit as number)
      .skip((Number(page) - 1) * Number(limit));

    res
      .status(200)
      .json(users.map(user => ({ ...user, name: user.name.trim() })));
  } catch (error) {
    console.log(error);
    res.status(500).end("Something went wrong");
  }
};

export default handler;
