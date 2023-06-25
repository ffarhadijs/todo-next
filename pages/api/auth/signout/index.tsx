import { connectDB } from "@/utils/connectDB";
import verifyToken from "@/utils/verifyToken";
import { serialize } from "cookie";
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

  const secretKey = process.env.SECRET_KEY;
  const { token } = req.cookies;

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
      .json({ status: "Failed", messgae: "you are unauthorized" });
  }

  res
    .status(201)
    .setHeader(
      "Set-Cookie",
      serialize("token", "", {
        maxAge: 0,
        path: "/",
        httpOnly: true,
      })
    )
    .json({
      status: "Success",
      message: "Signed out successfully",
    });
}
