import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongo";
import User, { IUserSchema } from "@/models/User";
import getUserID from "@/utils/get-userID";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Omit<IUserSchema, "password">>
) => {
  if (req.method == "PUT") {
    try {
      await dbConnect();

      const token = req.headers.authorization.split(" ")[1];

      const userID = getUserID(token);

      const user = await User.findById(userID);

      const {
        username,
        fName,
        lName,
        password,
        email,
        image,
        country,
        bgImage,
      } = req.body;

      user.username = username || user.username;
      user.fName = fName || user.fName;
      user.lName = lName || user.lName;
      user.password = password || user.password;
      user.email = email || user.email;
      user.image = image || user.image;
      user.background = bgImage || user.backgroud;
      user.country = country || user.country;

      const updatedUser = await user.save();

      const { password: pass, ...rest } = updatedUser._doc;

      res.status(201).json(rest);
    } catch (error) {
      console.log(error);
      res.status(500).end("Something went wrong");
    }
  }
};

export default handler;
