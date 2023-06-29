import TodoUser from "@/models/TodoUser";
import { connectDB } from "@/utils/connectDB";
import verifyToken from "@/utils/verifyToken";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return;

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

  const data = req.body;


  const user = await TodoUser.findOne({ email });

  const startList = user.todos.find(
    (todo: any) => todo.task.id === data.startId
  );
  const endList = user.todos.find((todo: any) => todo.task.id === data.endId);

  startList.task.list = data.newStartList;
  endList.task.list = data.newEndList;
  await user.save();

  res.status(201).json({ status: "Success", message: "Task position has been updated successfully!" });
}
