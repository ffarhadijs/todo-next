import TodoUser from "@/models/TodoUser";
import { ColumnType } from "@/types/column.type";
import { connectDB } from "@/utils/connectDB";
import verifyToken from "@/utils/verifyToken";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") return;

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

  const data = req.query;

  const user = await TodoUser.findOne({ email });

  const column = user.todos.find((item: any) => item.task.id === data.column);
  const todo = column.task.list.filter((item: ColumnType) => item.id !== data.itemId);

  user.todos.find((item: any) => item.task.id === data.column).task.list=todo
  await user.save();

  res.status(201).json({ status: "Success", message: "Task has been deleted successfully!" });
}
