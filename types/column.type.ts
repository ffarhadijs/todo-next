import { TodoType } from "./todo.type";

export type ColumnType = {
  columnId: string;
  id: string;
  list: [TodoType];
};
