import { QueryKey } from "@/enums/queryKey.enum";
import axios from "axios";
import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from "react-query";

export const useGetTasks = (options?: UseQueryOptions) => {
  return useQuery<any, any>({
    queryKey: QueryKey.getTasks,
    queryFn: () => axios.get("/api/task/getTasks"),
    ...options,
  });
};

export const useAddTask = (
  data: any,
  options?: UseMutationOptions<unknown, unknown, void, unknown>
) => {
  return useMutation({
    mutationFn: () => axios.post("/api/task/addTask", data),
    ...options,
  });
};

export const useEditTask = (
  column: any,
  itemId: any,
  title: any,
  options?: UseMutationOptions<unknown, unknown, void, unknown>
) => {
  return useMutation({
    mutationFn: () =>
      axios.patch(`/api/task/editTask/${column}`, { itemId, title }),
    ...options,
  });
};

export const useDeleteTask = (column:any,itemId:any,
  options?: UseMutationOptions<unknown, unknown, void, unknown>
) => {
  return useMutation({
    mutationFn: () => axios.delete(`/api/task/deleteTask/${column}/${itemId}`),
    ...options,
  });
};
