import TodoUser from "@/models/TodoUser";
import { connectDB } from "@/utils/connectDB";
import verifyToken from "@/utils/verifyToken";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") return;

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
  const { column } = req.query;

  const user = await TodoUser.findOne({ email });

  const columnId = user.todos.find((item: any) => item.task.id === column);
  const todo = columnId.task.list.find((item: any) => item.id === data.itemId);

  todo.title = data.data.title;
  todo.description = data.data.description;
  todo.label = data.data.label;
  todo.category = data.data.category;

  await user.save();

  res.status(201).json({
    status: "Success",
    message: "Task has been updated successfully!",
  });
}
