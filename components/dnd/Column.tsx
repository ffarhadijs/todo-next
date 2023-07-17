import React, { useState } from "react";
import Item from "./Item";
import {
  Flex,
  Box,
  TextInput,
  ActionIcon,
  useMantineTheme,
  Tooltip,
  ScrollArea,
  Title,
  Menu,
  Divider,
  Modal,
} from "@mantine/core";
import { Droppable } from "react-beautiful-dnd";
import { isNotEmpty, useForm } from "@mantine/form";
import { useQueryClient } from "react-query";
import { IoMdDoneAll } from "react-icons/io";
import { notifications } from "@mantine/notifications";
import { useAddTask } from "@/hooks/tasks/tasks.hooks";
import { BsThreeDots } from "react-icons/bs";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import AddOrEditCard from "../modals/addOrEditCard/AddOrEditCard";
import { useDisclosure } from "@mantine/hooks";
import ConfirmDelete from "../modals/confirmDelete/ConfirmDelete";

interface ColumnProps {
  col: any;
  card: any;
  setCard: any;
}

const Column: React.FC<ColumnProps> = ({ col, card, setCard }) => {
  const theme = useMantineTheme();
  const [show, setShow] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [deleteOpened, { open: deleteOpen, close: deleteClose }] =
    useDisclosure(false);

  const form = useForm({
    initialValues: {
      title: "",
    },
    validate: {
      title: isNotEmpty("You should input your task"),
    },
  });
  const title = form.values.title;
  const status = col.id;
  const data = {
    title,
    status,
  };
  const useQuery = useQueryClient();
  const { mutate, isLoading } = useAddTask(data, {
    onSuccess: () => {
      useQuery.invalidateQueries();
      form.reset();
      notifications.show({
        color: "green",
        title: "Add Task",
        message: "Task has been dded successfully",
      });
    },
  });

  const submitHandler = (formData: any) => {
    const title = formData.title;
    const status = col.id;
    mutate(title, status);
  };

  const addInputHandler = () => {
    setShow(!show);
    form.reset();
  };

  const editCardHandler = (col: any) => {
    open();
    setCard(col);
  };
  const deleteCardHandler = (col: any) => {
    setCard(col);
    deleteOpen();
  };
  return (
    <>
      <Modal
        opened={opened || deleteOpened}
        onClose={opened ? close : deleteClose}
        title={opened ? "Edit Card" : "Delete Card"}
      >
        {opened ? (
          <AddOrEditCard close={close} col={card} />
        ) : (
          <ConfirmDelete column={card} close={deleteClose} />
        )}
      </Modal>
      <Droppable droppableId={col.id}>
        {(provided) => (
          <ScrollArea h={"72vh"} offsetScrollbars pb={5}>
            <Flex
              direction={"column"}
              p={"16px"}
              sx={{
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[5]
                    : theme.colors.gray[2],
                borderRadius: 8,
                flexGrow: 1,
                marginTop: 8,
                border: "1px dashed gray",
                minHeight: "68vh",
                maxWidth: "100%",
              }}
            >
              <Flex
                direction={"row"}
                align={"center"}
                justify={"space-between"}
              >
                <Title order={3}>{col.id}</Title>
                <Menu shadow="md">
                  <Menu.Target>
                    <ActionIcon>
                      <BsThreeDots size={"20px"} />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item
                      icon={<MdEdit size={"16px"} />}
                      onClick={() => editCardHandler(col)}
                    >
                      Edit
                    </Menu.Item>
                    <Menu.Item
                      icon={<MdDelete size={"16px"} />}
                      onClick={() => deleteCardHandler(col)}
                    >
                      Delete
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item
                      icon={<MdAdd size={"16px"} />}
                      onClick={addInputHandler}
                    >
                      Add Task
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Flex>
              <Divider mt={"xs"} />
              <Box {...provided.droppableProps} ref={provided.innerRef}>
                {col.list?.map((item: any, index: any) => (
                  <Item
                    key={item.id}
                    item={item}
                    index={index}
                    column={col.id}
                  />
                ))}
                {provided.placeholder}
                {show ? (
                  <Box
                    component="form"
                    onSubmit={form.onSubmit(submitHandler)}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "start",
                      justifyContent: "space-between",
                      marginTop: "40px",
                    }}
                  >
                    <TextInput
                      {...form.getInputProps("title")}
                      label="Add Task"
                    />
                    <Tooltip label="Save" fz={"xs"}>
                      <ActionIcon type="submit" loading={isLoading} mt="25px">
                        <IoMdDoneAll size="25px" color="green" />{" "}
                      </ActionIcon>
                    </Tooltip>
                  </Box>
                ) : null}
              </Box>
            </Flex>
          </ScrollArea>
        )}
      </Droppable>
    </>
  );
};

export default Column;
