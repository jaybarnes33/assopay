import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongo";
import User from "@/models/User";
import { setTokenCookie } from "@/utils/auth-cookie";
import { generateAccessToken, generateRefreshToken } from "@/utils/token";
import { getAmount } from "@/utils/getAmount";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const { user } = req.body;
      console.log(req.body);
      if (user.level % 100 !== 0) {
        return res.status(500).json({ message: "Invalid level" });
      } else {
        if (user.level! < 100 && user.level! > 400) {
          const amount = getAmount(user.level);
          res.json({ amount });
        }
      }

      await dbConnect();
    } catch (error) {
      console.log(error);
      res.json({ message: "Something went wrong" });
    }
  }
};
export default handler;
