import React from "react";
import { Draggable } from "react-beautiful-dnd";
import {
  Text,
  Flex,
  useMantineTheme,
  ActionIcon,
  Modal,
  Menu,
  Box,
} from "@mantine/core";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDisclosure } from "@mantine/hooks";
import ConfirmDelete from "../modals/confirmDelete/ConfirmDelete";
import { DotsVertical } from "tabler-icons-react";
import AddOrEditTask from "../modals/addOrEditTask/AddOrEditTask";
import { TodoType } from "@/types/todo.type";

interface Props {
  item: TodoType;
  index: number;
  column: string;
}
const Item = ({ item, index, column }: Props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [taskOpened, { open: taskOpen, close: taskClose }] =
    useDisclosure(false);

  const theme = useMantineTheme();

  const removeHandler = () => {
    open();
  };

  const editHandler = () => {
    taskOpen();
  };

  return (
    <>
      <Modal
        opened={opened || taskOpened}
        onClose={opened ? close : taskClose}
        title={opened ? "Delete Task" : "Edit Task"}
      >
        {opened && (
          <ConfirmDelete column={column} itemId={item.id} close={close} />
        )}
        {taskOpened && (
          <AddOrEditTask close={taskClose} col={column} task={item} />
        )}
      </Modal>
      <Draggable draggableId={item.id} index={index}>
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "start",
              }}
            >
              <Box
                bg={
                  item.label === "bug"
                    ? "red"
                    : item.label === "enhancement"
                    ? "teal"
                    : item.label === "question"
                    ? "pink"
                    : item.label === "duplicate"
                    ? "grape"
                    : item.label === "invalid"
                    ? "orange"
                    : item.label === "documentation"
                    ? "cyan"
                    : "blue"
                }
                w={6}
                h={28}
                mr={10}
              ></Box>
              <Text>{item.title}</Text>
            </Box>
            <Menu>
              <Menu.Target>
                <ActionIcon>
                  <DotsVertical size={"18px"} />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  icon={<MdEdit size={"16px"} />}
                  onClick={editHandler}
                >
                  Edit
                </Menu.Item>
                <Menu.Item
                  icon={<MdDelete size={"16px"} />}
                  onClick={removeHandler}
                >
                  Delete
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Flex>
        )}
      </Draggable>
    </>
  );
};

export default Item;
