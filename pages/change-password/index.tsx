import { useChangePassword } from "@/hooks/auth/auth.hooks";
import { ChangePassword } from "@/types/changePassword.type";
import { Box, Button, Group, PasswordInput } from "@mantine/core";
import { isNotEmpty, matchesField, useForm } from "@mantine/form";
import React from "react";

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
      confirmPassword: matchesField(
        "newPassword",
        "Passwords are not the same"
      ),
    },
  });

  const { mutate } = useChangePassword(
    form.values.oldPassword,
    form.values.newPassword,
    form.values.confirmPassword
  );
  
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
