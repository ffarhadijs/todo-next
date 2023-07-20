import React from "react";
import Item from "./Item";
import {
  Flex,
  Box,
  ActionIcon,
  useMantineTheme,
  ScrollArea,
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

interface ColumnProps {
  col: any;
  card: any;
  setCard: any;
}

const Column: React.FC<ColumnProps> = ({ col, card, setCard }) => {
  const theme = useMantineTheme();
  const [opened, { open, close }] = useDisclosure(false);
  const [taskOpened, { open: taskOpen, close: taskClose }] =
    useDisclosure(false);
  const [deleteOpened, { open: deleteOpen, close: deleteClose }] =
    useDisclosure(false);

  const addTaskHandler = () => {
    taskOpen();
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
        opened={opened || deleteOpened || taskOpened}
        onClose={opened ? close : deleteOpened ? deleteClose : taskClose}
        title={opened ? "Edit Card" : deleteOpened ? "Delete Card" : "Add Task"}
      >
        {opened ? (
          <AddOrEditCard close={close} col={card} />
        ) : deleteOpened ? (
          <ConfirmDelete column={card} close={deleteClose} />
        ) : (
          <AddOrEditTask close={taskClose} col={col} />
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
                      onClick={addTaskHandler}
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
              </Box>
            </Flex>
          </ScrollArea>
        )}
      </Droppable>
    </>
  );
};

export default Column;
