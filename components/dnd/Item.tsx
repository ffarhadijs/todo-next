import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import {
  Tooltip,
  Text,
  Flex,
  useMantineTheme,
  ActionIcon,
  Modal,
  TextInput,
  Box,
} from "@mantine/core";
import { MdDeleteForever, MdEditDocument } from "react-icons/md";
import { useDisclosure } from "@mantine/hooks";
import ConfirmDelete from "../confirmDelete";
import { isNotEmpty, useForm } from "@mantine/form";
import { MdEditOff } from "react-icons/md";
import { IoMdDoneAll } from "react-icons/io";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { notifications } from "@mantine/notifications";

interface ItemProps {
  item: any;
  index: number;
  column: any;
}
const Item = React.memo(({ item, index, column }: ItemProps) => {
  const [edit, setEdit] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();
  const queryClient = useQueryClient();
  const itemId = item.id;

  const form = useForm({
    initialValues: {
      title: item.title,
    },
    validate: {
      title: isNotEmpty("You should input your task!"),
    },
  });

  const title = form.values.title;

  const { mutate } = useMutation({
    mutationFn: () =>
      axios.patch(`/api/todo/editTodo/${column}`, { itemId, title }),
    onSuccess: () => {
      queryClient.invalidateQueries();
      notifications.show({
        color: "green",
        title: "Update Task",
        message: "Task has been updated successfully",
      });
      setEdit(false);
    },
  });

  const removeHandler = () => {
    open();
  };

  const editHandler = () => {
    setEdit(!edit);
  };

  const submitEditHandler = () => {
    mutate(itemId, title);
  };

  const cancelEditHandler = () => {
    setEdit(false);
    form.reset();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Delete Task">
        <ConfirmDelete column={column} itemId={item.id} close={close} />
      </Modal>
      <Draggable draggableId={item.title} index={index}>
        {(provided) => (
          <Flex
            direction={"row"}
            align={"start"}
            justify={"space-between"}
            sx={{
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[6]
                  : theme.colors.gray[0],
              borderRadius: 4,
              padding: "4px 8px",
              transition: "background-color .8s ease-out",
              marginTop: 12,

              ":hover": {
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[4]
                    : theme.colors.gray[4],
                transition: "background-color .1s ease-in",
              },
            }}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {!edit ? (
              <Text>{item.title}</Text>
            ) : (
              <Box
                component="form"
                onSubmit={form.onSubmit(submitEditHandler)}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <TextInput {...form.getInputProps("title")} />
                <Flex>
                  <Tooltip label="Cancel Edit" fz={"xs"}>
                    <ActionIcon onClick={cancelEditHandler}>
                      <MdEditOff size="20px" color="red" />
                    </ActionIcon>
                  </Tooltip>
                  <Tooltip label="Edit Task" fz={"xs"}>
                    <ActionIcon type="submit">
                      <IoMdDoneAll size="20px" color="green" />
                    </ActionIcon>
                  </Tooltip>
                </Flex>
              </Box>
            )}
            {!edit && (
              <Flex>
                <Tooltip label="Delete Task" fz={"xs"}>
                  <ActionIcon onClick={removeHandler}>
                    <MdDeleteForever size="20px" color="red" />
                  </ActionIcon>
                </Tooltip>
                <Tooltip label="Edit Task" fz={"xs"}>
                  <ActionIcon onClick={editHandler}>
                    <MdEditDocument size="20px" />
                  </ActionIcon>
                </Tooltip>
              </Flex>
            )}
          </Flex>
        )}
      </Draggable>
    </>
  );
});

export default Item;
