import TodoUser from "@/models/TodoUser";
import { connectDB } from "@/utils/connectDB";
import verifyPassword from "@/utils/verifyPassword";
import { NextApiRequest, NextApiResponse } from "next";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return;

  try {
    await connectDB();
  } catch (error) {
    return res.status(500).json({
      status: "Failed",
      message: "Error in connecting to DB",
    });
  }
  const secretKey = process.env.SECRET_KEY;
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({
      status: "Failed",
      message: "You should complete form",
    });
  }

  const existedUser = await TodoUser.findOne({ email });
  if (!existedUser) {
    return res.status(422).json({
      status: "Failed",
      message: "User doesn't exist",
    });
  }

  const validPassword = await verifyPassword(password, existedUser.password);

  if (!validPassword) {
    return res
      .status(422)
      .json({ status: "Failed", messgae: "Email or password is incorrect" });
  }

  const token = sign({ email }, secretKey!, { expiresIn: 60 * 60 * 24 });

  res
    .status(201)
    .setHeader(
      "Set-Cookie",
      serialize("token", token, {
        maxAge: 24 * 60 * 60,
        path: "/",
        httpOnly: true,
      })
    )
    .json({
      status: "Success",
      message: "Signed in successfully",
      data: email,
    });
}
