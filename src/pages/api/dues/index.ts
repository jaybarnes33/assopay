import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongo";
import User from "@/models/User";
import getUserID from "@/utils/get-userID";
import { sendSms } from "@/utils/sendSms";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { amount, reference } = req.body;

      await dbConnect();
      const token = req.headers.authorization?.split(" ")[1] || "";
      const userID = getUserID(token);

      const user = await User.findById(userID);

      user?.payments?.push({
        amount: amount,
        reference: reference
      });

      await user.save();
      console.log(user.phone);
      await sendSms(
        user.phone,
        `Hi ${user.firstName} ${user.lastName}, Your dues have been paid successfully. ${reference.reference} is your transaction reference. Please show this message before you register`
      );

      res.status(202).json({ user });
    } catch (error) {
      console.log(error);
      res.json({ message: "Something went wrong" });
    }
  }
};
export default handler;
