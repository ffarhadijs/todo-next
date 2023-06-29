import React from "react";
import { Box, Text, Group, Button } from "@mantine/core";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { notifications } from "@mantine/notifications";

const ConfirmDelete = ({ column, itemId, close }: any) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: () => axios.delete(`/api/todo/deleteTodo/${column}/${itemId}`),
    onSuccess: () => {
      queryClient.invalidateQueries();
      close();
      notifications.show({
        color: "green",
        title: "Delete Task",
        message: "Task has been deleted successfully",
      });
    },
  });

  const cancelHandler = () => {
    close();
  };
  const deleteHandler = () => {
    mutate(column, itemId);
  };
  return (
    <Box>
      <Text size="md">Are you sure to delete this task?</Text>
      <Group position="right" my="lg">
        <Button onClick={cancelHandler}>Cancel</Button>
        <Button onClick={deleteHandler} color="red" loading={isLoading}>
          Delete
        </Button>
      </Group>
    </Box>
  );
};

export default ConfirmDelete;
