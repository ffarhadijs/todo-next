import { useGetUser, useUpdateProfile } from "@/hooks/auth/auth.hooks";
import { UpdateUser } from "@/types/updateUser.type";
import verifyToken from "@/utils/verifyToken";
import { Box, Button, Center, Group, Loader, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import React from "react";

const Profile = () => {
  const { isLoading } = useGetUser({
    onSuccess: (data: any) => {
      form.setFieldValue("email", data.data.data.email);
      form.setFieldValue("firstName", data.data.data?.firstName);
      form.setFieldValue("lastName", data.data.data?.lastName);
    },
  });

  const form = useForm({
    initialValues: {
      firstName: "",
      email: "",
      lastName: "",
    },
  });
  const { mutate, isLoading: isUpdating } = useUpdateProfile(
    form.values.firstName!,
    form.values.lastName!,
    form.values.email!
  );

  const submitHandler = () => {
    mutate();
  };
  return (
    <Box
      component="form"
      onSubmit={form.onSubmit(submitHandler)}
      maw={500}
      mx={"auto"}
      my="md"
    >
      <Head>
        <title>Task-Next|Profile</title>
        <meta name="description" content="Update profile info" />
      </Head>
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { token } = context.req.cookies;
  const secretKey = process.env.SECRET_KEY;

  const { email } = await verifyToken(token!, secretKey!);
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
