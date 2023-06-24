import TodoUser from "@/models/TodoUser";
import { connectDB } from "@/utils/connectDB";
import hashPassword from "@/utils/hashPassword";
import { NextApiRequest, NextApiResponse } from "next";

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

  const { email, password, confirmPassword } = req.body;

  if (!email || !password || !confirmPassword) {
    return res
      .status(422)
      .json({ status: "Failed", message: "You should complete form" });
  }

  const user = await TodoUser.findOne({ email });

  if (user) {
    return res.status(422).json({
      status: "Failed",
      message: "User exist already!",
    });
  }

  const hashedPassword = await hashPassword(password);
  const hashedConfirmPassword = await hashPassword(confirmPassword);

  const newUser = await TodoUser.create({
    email,
    password: hashedPassword,
    confirmPassword: hashedConfirmPassword,
  });

  return res
    .status(201)
    .json({ status: "Success", message: "User signed up successfully!" });
}
