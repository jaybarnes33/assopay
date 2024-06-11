import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongo";
import User from "@/models/User";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const {
        firstName,
        lastName,
        password,
        email,
        otherNames,
        phone,
        gender
      } = req.body;
      await dbConnect();

      const userExists = await User.findOne({
        email
      });

      if (!userExists) {
        let user = new User({
          firstName,
          lastName,
          password,
          email,
          otherNames,
          phone,
          gender
        });

        await user.save();
        res.status(201).json(user);
      } else {
        res.status(403).json({ error: "User already exists" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error, message: "Something went wrong" });
    }
  }
};

export default handler;
