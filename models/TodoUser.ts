import { UserType } from "@/types/user.type";
import { Schema, model, models } from "mongoose";

const todoUserSchema = new Schema({
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  todos: {
    type: [
      {
        task: {
          id: { type: String },
          list: [{ title: { type: String }, status: { type: String } }],
        },
      },
    ],
    required: false,
    default: [
      {
        task: {
          id: "todo",
          list: [],
        },
      },
      {
        task: {
          id: "doing",
          list: [],
        },
      },
      {
        task: {
          id: "done",
          list: [],
        },
      },
    ],
  },
});

const TodoUser = models.TodoUser || model<UserType>("TodoUser", todoUserSchema);

export default TodoUser;
