import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongo";
import User from "@/models/User";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    if (!req.body.email.startsWith("ce")) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    try {
      const {
        fName,
        lName,
        password,
        email,
        otherNames,
        level,
        hall,
        phone,
        gender,
      } = req.body;
      await dbConnect();

      const userExists = await User.findOne({
        email,
      });

      if (!userExists) {
        let user = new User({
          fName,
          lName,
          password,
          email,
          otherNames,
          level,
          hall,
          phone,
          gender,
        });

        await user.save();
        res.status(201).json({
          fName: user.Fname,
          lName: user.Lname,
          email: user.email,
          username: user.username,
          country: user.country,
        });
      } else {
        res.status(403).json({ error: "User already exists" });
      }
    } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
    }
  }
};

export default handler;
