import { useAddNewCard, useEditCard } from "@/hooks/cards/cards.hooks";
import { ColumnType } from "@/types/column.type";
import { Box, TextInput, Group, Button } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "react-query";

type Props = {
  close: () => void;
  col?: ColumnType;
};

export default function AddOrEditCard({ close, col }: Props) {
  const editable = !!col?.columnId;

  const form = useForm({
    initialValues: {
      id: col?.id || "",
    },
    validate: {
      id: isNotEmpty("You should input your card name"),
    },
  });

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useAddNewCard(form.values, {
    onSuccess: () => {
      close();
      queryClient.invalidateQueries();
      notifications.show({
        color: "green",
        title: "Add Card",
        message: "Card has been added successfully",
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
  const { mutate: editCardMutate, isLoading: editCardLoading } = useEditCard(
    form.values,
    col?.columnId!,
    {
      onSuccess: () => {
        close();
        queryClient.invalidateQueries();
        notifications.show({
          color: "green",
          title: "Edit Card",
          message: "Card has been updated successfully",
        });
      },
      onError: (error: any) => {
        notifications.show({
          color: "red",
          title: "Error",
          message: error?.response?.data?.message,
        });
      },
    }
  );

  const submitHandler = () => {
    if (editable) {
      editCardMutate();
    } else {
      mutate();
    }
  };
  return (
    <Box component="form" onSubmit={form.onSubmit(submitHandler)}>
      <TextInput
        description="Card name should be unique"
        label="Card Name"
        withAsterisk
        {...form.getInputProps("id")}
        mb={"lg"}
      />
      <Group position="right">
        <Button color="red" onClick={close}>
          Cancel
        </Button>
        <Button
          color="teal"
          type="submit"
          loading={isLoading || editCardLoading}
        >
          Save
        </Button>
      </Group>
    </Box>
  );
}
