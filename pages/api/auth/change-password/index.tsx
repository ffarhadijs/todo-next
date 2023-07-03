import TodoUser from "@/models/TodoUser";
import { connectDB } from "@/utils/connectDB";
import hashPassword from "@/utils/hashPassword";
import verifyPassword from "@/utils/verifyPassword";
import verifyToken from "@/utils/verifyToken";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") {
    return;
  }

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

  const { oldPassword, newPassword, confirmPassword } = req.body;

  const user = await TodoUser.findOne({ email });
  const validatePassword = await verifyPassword(oldPassword, user.password);
  const hashedPassword = await hashPassword(newPassword);
  const hashedConfirmPassword = await hashPassword(confirmPassword);
  if (!validatePassword) {
    return res.status(401).json({
      status: "Failed",
      message: "Old password is not correct",
    });
  }
  if (newPassword !== confirmPassword) {
    return res.status(401).json({
      status: "Failed",
      message: "New password and confirm password are not same",
    });
  }
  user.password = hashedPassword;
  user.confirmPassword = hashedConfirmPassword;

  await user.save();

  res.status(201).json({
    status: "Success",
    message: "Password changed succesfully",
  });
}
