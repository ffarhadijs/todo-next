import { QueryKey } from "@/enums/queryKey.enum";
import TodoUser from "@/models/TodoUser";
import { UpdateUser } from "@/types/updateUser.type";
import { connectDB } from "@/utils/connectDB";
import verifyToken from "@/utils/verifyToken";
import { Box, Button, Center, Group, Loader, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import React from "react";
import { useMutation, useQueryClient, useQuery } from "react-query";

const Profile = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: [QueryKey.GetUser],
    queryFn: () => axios.get("/api/auth/getUser"),
    onSuccess: (data) => {
      form.setFieldValue("email", data.data.data.email);
      form.setFieldValue("firstName", data.data.data?.firstName);
      form.setFieldValue("lastName", data.data.data?.lastName);
    },
    refetchOnMount: "always",
  });

  const { mutate, isLoading: isUpdating } = useMutation<
    Record<string, string>,
    unknown,
    UpdateUser
  >({
    mutationFn: () => axios.post("/api/auth/updateProfile", form.values),
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
  });
  const form = useForm({
    initialValues: {
      firstName: "",
      email: data?.data?.data?.email,
      lastName: "",
    },
  });

  const submitHandler = (data: UpdateUser) => {
    mutate(data);
  };
  return (
    <Box
      component="form"
      onSubmit={form.onSubmit(submitHandler)}
      maw={500}
      mx={"auto"}
      my="md"
    >
      {isLoading ? (
        <Center>
          <Loader />
        </Center>
      ) : (
        <>
          <TextInput
            {...form.getInputProps("firstName")}
            label="First Name"
            w="100%"
          />
          <TextInput
            {...form.getInputProps("lastName")}
            label={"Last Name"}
            my="lg"
            w="100%"
          />
          <TextInput
            {...form.getInputProps("email")}
            readOnly
            label={"Email"}
            w="100%"
          />

          <Group position="right" my="md">
            <Button color="teal" type="submit" loading={isUpdating}>
              Save
            </Button>
          </Group>
        </>
      )}
    </Box>
  );
};

export default Profile;

export async function getServerSideProps(context: any) {
  const { token } = context.req.cookies;
  const secretKey = process.env.SECRET_KEY;

  const { email } = await verifyToken(token, secretKey!);
  if (!email) {
    return {
      redirect: { destination: "/signin", permanent: false },
    };
  } else {
    return {
      props: {
        email,
      },
    };
  }
}
