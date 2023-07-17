import axios from "axios";
import { UseMutationOptions, useMutation } from "react-query";

export function useAddNewCard(
  data: any,
  options?: UseMutationOptions<unknown, unknown, void, unknown>
) {
  return useMutation({
    mutationFn: () => axios.post("/api/card/addCard", data),
    ...options,
  });
}

export function useEditCard(
  data: any,
  columnId: any,
  options?: UseMutationOptions<unknown, unknown, void, unknown>
) {
  return useMutation({
    mutationFn: () => axios.patch("/api/card/editCard", { data, columnId }),
    ...options,
  });
}

export function useDeleteCard(
  columnId: any,
  options?: UseMutationOptions<unknown, unknown, void, unknown>
) {
  return useMutation({
    mutationFn: () => axios.delete(`/api/card/deleteCard/${columnId}`),
    ...options,
  });
}
