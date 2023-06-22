import { Schema, model, models } from "mongoose";

const todoUserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
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
  avatar: {
    type: String,
    required: false,
  },
  todos: {
    type: [{ title: "", status: "todo" }],
    required: false,
    default: [],
  },
});

const TodoUser = models.TodoUser || model("user", todoUserSchema);

export default TodoUser;
