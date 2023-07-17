import { QueryKey } from "@/enums/queryKey.enum";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import { useRouter } from "next/router";
import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";

export const useSignin = (
  email: string,
  password: string,
  options?: UseMutationOptions<unknown, unknown, void, unknown>
) => {
  const { push } = useRouter();
  return useMutation({
    mutationFn: () => axios.post("/api/auth/signin", { email, password }),
    onSuccess: () => {
      notifications.show({
        color: "green",
        title: "Signin",
        message: "User signed in successfully!",
      });
      push("/dashboard");
    },
    onError: (error: any) => {
      notifications.show({
        color: "red",
        title: "Error",
        message: error?.response?.data?.message,
      });
    },
    ...options,
  });
};

export const useSignup = (
  email: string,
  password: string,
  confirmPassword: string,
  options?: UseMutationOptions<unknown, unknown, void, unknown>
) => {
  const { push } = useRouter();
  return useMutation({
    mutationFn: () =>
      axios.post("/api/auth/signup", { email, password, confirmPassword }),
    onSuccess: () => {
      notifications.show({
        color: "green",
        title: "Signun",
        message: "User signed up successfully!",
      });
      push("/signin");
    },
    onError: (error: any) => {
      notifications.show({
        color: "red",
        title: "Error",
        message: error?.response?.data?.message,
      });
    },
    ...options,
  });
};

export const useUpdateProfile = (
  firstName: string,
  lastName: string,
  email: string,
  options?: UseMutationOptions<unknown, unknown, void, unknown>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () =>
      axios.post("/api/auth/updateProfile", { firstName, lastName, email }),
    onSuccess: () => {
      notifications.show({
        color: "green",
        title: "Update",
        message: "User data updated successfully",
      });
      queryClient.invalidateQueries();
    },
    onError(error: any) {
      notifications.show({
        color: "red",
        title: "Error",
        message: error?.response?.data?.message,
      });
    },
    ...options,
  });
};

export const useGetUser = (options?: UseQueryOptions) => {
  return useQuery<any,any>({
    queryKey: [QueryKey.GetUser],
    queryFn: () => axios.get("/api/auth/getUser"),
    onError: (error: any) => {
      notifications.show({
        color: "red",
        title: "Error",
        message: error?.response?.data?.message,
      });
    },
    refetchOnMount: "always",
    ...options,
  });
};

export const useChangePassword = (
  oldPassword: string,
  newPassword: string,
  confirmPassword: string,
  options?: UseMutationOptions<unknown, unknown, void, unknown>
) => {
  return useMutation({
    mutationFn: () =>
      axios.patch("/api/auth/change-password", {
        oldPassword,
        newPassword,
        confirmPassword,
      }),
    onSuccess: () => {
      notifications.show({
        color: "green",
        title: "Change Password",
        message: "Password has been changed successfully",
      });
    },
    onError(error: any) {
      notifications.show({
        color: "red",
        title: "Error",
        message: error?.response?.data?.message,
      });
    },
    ...options,
  });
};

export const useSignout = (options?:UseQueryOptions) => {
  const { push } = useRouter();
  return useQuery({
    queryKey: [QueryKey.Logout],
    queryFn: () => axios.get("/api/auth/signout"),
    onSuccess: () => {
      notifications.show({
        color: "green",
        title: "Signout",
        message: "User signed out successfully",
      });
      push("/signin");
    },
    onError(error: any) {
      notifications.show({
        color: "red",
        title: "Error",
        message: error?.response?.data?.message,
      });
    },
    ...options
  });
};
