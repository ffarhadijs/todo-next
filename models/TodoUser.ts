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
    type: [{ title: String, status: String }],
    required: false,
    default: [],
  },
});

const TodoUser = models.TodoUser || model<UserType>("TodoUser", todoUserSchema);


export default TodoUser;
