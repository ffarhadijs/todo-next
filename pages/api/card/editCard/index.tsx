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
      .json({ status: "Failed", messgae: "you are unauthorized" });
  }

  const { data, columnId } = req.body;

  if (!data.id || !columnId) {
    return res.status(422).json({ status: "Failed", message: "Invaild data!" });
  }

  const user = await TodoUser.findOne({ email });
  const existId = user.todos.findIndex(
    (item: any) => item.task.id === data.id
  );

  if (existId === -1) {
    const card = user.todos.find((item: any) => item.id === columnId);
    card.task.id = data.id;

    await user.save();
    return res.status(201).json({
      status: "Success",
      message: "Card has been updated successfully!",
    });
  } else {
    return res.status(422).json({
      status: "Failed",
      message: "Card name is exist, Please change the name.",
    });
  }
}
