import React from "react";
import Item from "./Item";
import {
  Flex,
  Box,
  ActionIcon,
  useMantineTheme,
  Title,
  Menu,
  Divider,
  Modal,
} from "@mantine/core";
import { Droppable } from "react-beautiful-dnd";
import { BsThreeDots } from "react-icons/bs";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import AddOrEditCard from "../modals/addOrEditCard/AddOrEditCard";
import { useDisclosure } from "@mantine/hooks";
import ConfirmDelete from "../modals/confirmDelete/ConfirmDelete";
import AddOrEditTask from "../modals/addOrEditTask/AddOrEditTask";
import styles from "../../styles/styles.module.css";
import { ColumnType } from "@/types/column.type";
import { TodoType } from "@/types/todo.type";

interface Props {
  col: ColumnType;
  card: ColumnType;
  setCard: any;
}

const Column = ({ col, card, setCard }: Props) => {
  const theme = useMantineTheme();
  const [opened, { open, close }] = useDisclosure(false);
  const [taskOpened, { open: taskOpen, close: taskClose }] =
    useDisclosure(false);
  const [deleteOpened, { open: deleteOpen, close: deleteClose }] =
    useDisclosure(false);

  const addTaskHandler = () => {
    taskOpen();
  };

  const editCardHandler = (col: ColumnType) => {
    open();
    setCard(col);
  };
  const deleteCardHandler = (col: ColumnType) => {
    setCard(col);
    deleteOpen();
  };

  return (
    <>
      <Modal
        opened={opened || deleteOpened || taskOpened}
        onClose={opened ? close : deleteOpened ? deleteClose : taskClose}
        title={opened ? "Edit Card" : deleteOpened ? "Delete Card" : "Add Task"}
      >
        {opened ? (
          <AddOrEditCard close={close} col={card} />
        ) : deleteOpened ? (
          <ConfirmDelete column={card.columnId} close={deleteClose} />
        ) : (
          <AddOrEditTask close={taskClose} col={col.id} />
        )}
      </Modal>
      <Droppable droppableId={col.id}>
        {(provided) => (
          <Flex
            style={{
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[5]
                  : theme.colors.gray[2],
              padding: "16px",
              flexDirection: "column",
              borderRadius: 8,
              flexGrow: 1,
              marginTop: 8,
              border: "1px dashed gray",
              height: "70vh",
              minHeight: "auto",
              maxWidth: "100%",
            }}
          >
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
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
                    onClick={addTaskHandler}
                  >
                    Add Task
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Box>
            <Divider mt={"xs"} />
            <Box
              className={styles.cardScroll}
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                height: "100%",
                overflow: "auto",
              }}
            >
              {col.list?.map((item: TodoType, index: number) => (
                <Item key={item.id} item={item} index={index} column={col.id} />
              ))}
              {provided.placeholder}
            </Box>
          </Flex>
        )}
      </Droppable>
    </>
  );
};

export default Column;
