import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongo";
import User from "@/models/User";
import { setTokenCookie } from "@/utils/auth-cookie";
import { generateAccessToken, generateRefreshToken } from "@/utils/token";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { username, password, remember } = req.body;
      await dbConnect();

      const user = await User.findOne({
        $or: [{ username: username }],
      });

      if (!user) {
        return res.status(400).json({
          message: `User with username ${username} does not exist`,
          key: "username",
        });
      } else if (!(await user.matchPassword(password))) {
        return res
          .status(400)
          .json({ message: "Password is incorrect", key: "password" });
      } else {
        const accessToken = generateAccessToken({ sub: user._id });
        const refreshToken = generateRefreshToken({ sub: user._id });

        if (remember) {
          setTokenCookie(res, refreshToken);
          res.json({ accessToken, refreshToken });
        } else {
          res.json({ accessToken, refreshToken });
        }
      }
    } catch (error) {
      res.status(500).end("Something went wrong");
    }
  }
};
