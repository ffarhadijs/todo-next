import React from "react";
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
import { isEmail, isNotEmpty } from "@mantine/form";
import { useForm } from "@mantine/form";
import Link from "next/link";

const Signin = () => {
  const theme = useMantineTheme();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: isEmail("Is not valid email address"),
      password: isNotEmpty("You should input your password"),
    },
  });

  const cancelHandler = () => {};

  const submitHandler = () => {};
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
        <Group position="right" spacing={"md"} my={"xl"}>
          <Button onClick={cancelHandler} color="red">
            Cancel
          </Button>
          <Button type="submit" color="teal">
            Signin
          </Button>
        </Group>
        <Text component="span">Not registered? </Text>
        <Link
          href={"/signup"}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          {" "}
          click here
        </Link>
      </Box>
    </Flex>
  );
};

export default Signin;
