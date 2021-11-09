import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongo";
import User, { IUserSchema } from "@/models/User";
import getUserID from "@/utils/get-userID";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<Omit<IUserSchema, "password">>
) => {
  try {
    await dbConnect();

    const token = req.headers.authorization.split(" ")[1];

    const userID = getUserID(token);
    if (!userID) return res.status(401).end("Unauthorized!");

    const user = await User.findById(userID).select("-password");

    if (!user) return res.status(400).end("User not found");

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).end("Something went wrong");
  }
};
