import TodoUser from "@/models/TodoUser";
import { connectDB } from "@/utils/connectDB";
import verifyToken from "@/utils/verifyToken";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return;

  try {
    await connectDB();
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "Error on connecting to DB",
    });
  }

  const { token } = req.cookies;
  const secretKey = process.env.SECRET_KEY;
  if (!token) {
    res.status(401).json({
      status: "Failed",
      message: "You are not signed in",
    });
  }

  const { email } = verifyToken(token!, secretKey!);

  if (!email) {
    return res
      .status(401)
      .json({ status: "failed", messgae: "you are unauthorized" });
  }

  const user = await TodoUser.findOne({ email });

  res.status(200).json({
    status: "Success",
    data: user,
  });
}
