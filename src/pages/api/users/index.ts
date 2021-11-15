import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongo";
import User, { IUserSchema } from "@/models/User";
import getUserID from "@/utils/get-userID";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect();
    const keyword = req.query.keyword;
    const token = req.headers.authorization?.split(" ")[1] || "";

    const userID = getUserID(token);
    if (!userID) return res.status(401).end("Unauthorized!");

    const user = await User.findById(userID).select("-password");

    if (user.isAdmin) {
      const users = keyword
        ? await User.find({
            $text: { $search: String(keyword) }
          }).select("-password")
        : await User.find({}).select("-password");
      res.status(200).json(users);
    } else {
      res.status(400).json("Only Admin");
    }
  } catch (error) {
    console.log(error);
    res.status(500).end("Something went wrong");
  }
};

export default handler;
