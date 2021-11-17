import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongo";
import User, { IUserSchema } from "@/models/User";
import getUserID from "@/utils/get-userID";

export type TUser = Pick<IUserSchema, "_id" | "level" | "campus"> & {
  name: string;
  paid: boolean;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{ users: TUser[]; hasMore: boolean }>
) => {
  try {
    await dbConnect();
    const { keyword, limit = 10, page = 1, filters } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
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
      .skip(skip)
      .sort("level");

    const total = await User.find().countDocuments();
    const hasMore = total > skip + Number(limit);

    const parsedFilters = JSON.parse(filters as string);
    const filteredUsers = users?.filter(user => {
      if (
        parsedFilters.level?.map((v: string) => +v).includes(user.level) ||
        parsedFilters.campus?.includes(user.campus) ||
        parsedFilters.payment
          ?.map((v: string) => Boolean(+v))
          .includes(user.paid)
      ) {
        return user;
      }
    });

    const finalUsers = Object.keys(parsedFilters).length
      ? filteredUsers
      : users;

    const result = {
      users: finalUsers.map(user => ({ ...user, name: user.name.trim() })),
      hasMore
    };

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).end("Something went wrong");
  }
};

export default handler;
