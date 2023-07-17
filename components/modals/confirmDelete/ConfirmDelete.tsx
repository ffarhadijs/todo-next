import React from "react";
import { Box, Text, Group, Button } from "@mantine/core";
import { useQueryClient } from "react-query";
import { notifications } from "@mantine/notifications";
import { useDeleteTask } from "@/hooks/tasks/tasks.hooks";
import { useDeleteCard } from "@/hooks/cards/cards.hooks";

const ConfirmDelete = ({ column, itemId, close }: any) => {
  const queryClient = useQueryClient();
  const columnId = column.columnId;

  const { mutate, isLoading } = useDeleteTask(column, itemId, {
    onSuccess: () => {
      queryClient.invalidateQueries();
      close();
      notifications.show({
        color: "green",
        title: "Delete Task",
        message: "Task has been deleted successfully",
      });
    },
    onError: (error: any) => {
      notifications.show({
        color: "red",
        title: "Error",
        message: error?.response?.data?.message,
      });
    },
  });

  const { mutate: deleteCardMutate, isLoading: deleteCardLoading } =
    useDeleteCard(columnId, {
      onSuccess: () => {
        queryClient.invalidateQueries();
        close();
        notifications.show({
          color: "green",
          title: "Delete Card",
          message: "Card has been deleted successfully",
        });
      },
      onError: (error: any) => {
        notifications.show({
          color: "red",
          title: "Error",
          message: error?.response?.data?.message,
        });
      },
    });

  const cancelHandler = () => {
    close();
  };

  const deleteHandler = () => {
    if (itemId) {
      mutate(column, itemId);
    } else {
      deleteCardMutate(columnId);
    }
  };

  return (
    <Box>
      <Text size="md">
        Are you sure to delete this {itemId ? "task" : "card"}?
      </Text>
      <Group position="right" my="lg">
        <Button onClick={cancelHandler}>Cancel</Button>
        <Button
          onClick={deleteHandler}
          color="red"
          loading={isLoading || deleteCardLoading}
        >
          Delete
        </Button>
      </Group>
    </Box>
  );
};

export default ConfirmDelete;
