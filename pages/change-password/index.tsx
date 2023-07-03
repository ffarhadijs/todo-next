import { ChangePassword } from "@/types/changePassword.type";
import { Box, Button, Group, PasswordInput } from "@mantine/core";
import { isNotEmpty, matchesField, useForm } from "@mantine/form";
import axios from "axios";
import React from "react";
import { useMutation } from "react-query";

const ChangePassword = () => {
  const form = useForm<ChangePassword>({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validate: {
      oldPassword: isNotEmpty("You should input your old password"),
      newPassword: isNotEmpty("You should input your new password"),
      confirmPassword:  matchesField('newPassword', 'Passwords are not the same'),
    },
  });
  const oldPassword = form.values.oldPassword;
  const newPassword = form.values.newPassword;
  const confirmPassword = form.values.confirmPassword;
  const { mutate } = useMutation({
    mutationFn: () =>
      axios.patch("/api/auth/change-password", {
        oldPassword,
        newPassword,
        confirmPassword,
      }),
  });
  const submitHandler = (data: any) => {
    mutate(data);
  };
  return (
    <Box
      component="form"
      maw={500}
      mx={"auto"}
      my="md"
      onSubmit={form.onSubmit(submitHandler)}
    >
      <PasswordInput
        {...form.getInputProps("oldPassword")}
        label="Old Password:"
        withAsterisk
      />
      <PasswordInput
        {...form.getInputProps("newPassword")}
        label="New Password:"
        withAsterisk
        my="lg"
      />
      <PasswordInput
        {...form.getInputProps("confirmPassword")}
        label="Confirm Password:"
        withAsterisk
      />
      <Group position="right">
        <Button type="submit" color="teal" my="md">
          Save
        </Button>
      </Group>
    </Box>
  );
};

export default ChangePassword;
