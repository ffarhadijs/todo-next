import React, { useEffect } from "react";
import {
  Box,
  Button,
  Group,
  PasswordInput,
  TextInput,
  useMantineTheme,
  Flex,
  Text,
  Divider,
} from "@mantine/core";
import { isEmail, isNotEmpty, matchesField } from "@mantine/form";
import { useForm } from "@mantine/form";
import Link from "next/link";
import { UserType } from "@/types/user.type";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useSignup } from "@/hooks/auth/auth.hooks";
import Head from "next/head";

const Signup = () => {
  const token = Cookies.get("token");
  const { push } = useRouter();
  const theme = useMantineTheme();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      email: isEmail("Is not valid email address"),
      password: isNotEmpty("You should input your password"),
      confirmPassword: matchesField(
        "password",
        "Your password and confirm password are not same"
      ),
    },
  });
  const { mutate, isLoading } = useSignup(
    form.values.email,
    form.values.password,
    form.values.confirmPassword
  );

  const submitHandler = (data: UserType) => {
    mutate();
  };

  useEffect(() => {
    token && push("/");
  }, []);

  return (
    <Flex
      justify={"center"}
      align={"center"}
      sx={{
        height: "100vh",
        background:
          theme.colorScheme === "dark"
            ? theme.colors.dark[8]
            : theme.colors.gray[2],
      }}
    >
      <Head>
        <title>Task-Next|Signup</title>
        <meta name="description" content="Signup for manage tasks" />
      </Head>
      <Box
        sx={{
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
          borderRadius: "10px",
        }}
        w={500}
        p="xl"
        miw={300}
        mx={"auto"}
        component="form"
        onSubmit={form.onSubmit(submitHandler)}
      >
        <Text fz={"xl"} component="h1">
          Welcome to Todo-App
        </Text>
        <Divider mb={"lg"} />
        <TextInput
          label="Email"
          placeholder="Johndoe@example.com"
          {...form.getInputProps("email")}
        />
        <PasswordInput
          my={"lg"}
          label="Password"
          {...form.getInputProps("password")}
        />
        <PasswordInput
          label="Confirm Password"
          {...form.getInputProps("confirmPassword")}
        />
        <Group position="right" spacing={"md"} my={"xl"}>
          <Button type="submit" color="teal" loading={isLoading}>
            Signup
          </Button>
        </Group>
        <Text component="span">Do you hava an account? </Text>
        <Link
          href={"/signin"}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          {" "}
          click here
        </Link>
      </Box>
    </Flex>
  );
};

export default Signup;
