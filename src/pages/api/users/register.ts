import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongo";
import User from "@/models/User";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { fName, lName, password, email, username, country } = req.body;
      await dbConnect();

      const userExists = await User.findOne({
        $or: [{ username: username }, { email: email }],
      });

      if (!userExists) {
        let user = new User({
          fName,
          lName,
          password,
          email,
          username,
          country,
        });

        await user.save();
        res
          .status(201)
          .json({
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
