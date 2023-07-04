import React, { useState } from "react";
import Item from "./Item";
import {
  Flex,
  Box,
  TextInput,
  ActionIcon,
  useMantineTheme,
  Tooltip,
} from "@mantine/core";
import { Droppable } from "react-beautiful-dnd";
import { isNotEmpty, useForm } from "@mantine/form";
import { useQueryClient } from "react-query";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { IoMdDoneAll } from "react-icons/io";
import { notifications } from "@mantine/notifications";
import { useAddTask } from "@/hooks/tasks/tasks.hooks";

interface ColumnProps {
  col: any;
}

const Column: React.FC<ColumnProps> = ({ col }) => {
  const theme = useMantineTheme();
  const [show, setShow] = useState(false);
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

  return (
    <Droppable droppableId={col.id}>
      {(provided) => (
        <Flex direction={"column"} py={"24px"} px={"16px"} mt={"8px"}>
          <Flex direction={"row"} align={"center"} justify={"space-between"}>
            <h2 style={{ margin: "0", padding: "0 16px" }}>{col.id}</h2>
            <Tooltip label={`${show ? "Hide" : "Show"} add input`} fz="xs">
              <ActionIcon onClick={addInputHandler}>
                {!show ? (
                  <AiOutlinePlus size={"25px"} />
                ) : (
                  <AiOutlineMinus size={"25px"} />
                )}
              </ActionIcon>
            </Tooltip>
          </Flex>
          <Box
            {...provided.droppableProps}
            ref={provided.innerRef}
            sx={{
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[5]
                  : theme.colors.gray[2],
              borderRadius: 8,
              padding: 16,
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              marginTop: 8,
              border: "1px dashed gray",
            }}
          >
            {col.list?.map((item: any, index: any) => (
              <Item
                key={item.title}
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
                <TextInput {...form.getInputProps("title")} label="Add Task" />
                <Tooltip label="Save" fz={"xs"}>
                  <ActionIcon type="submit" loading={isLoading} mt="25px">
                    <IoMdDoneAll size="25px" color="green" />{" "}
                  </ActionIcon>
                </Tooltip>
              </Box>
            ) : null}
          </Box>
        </Flex>
      )}
    </Droppable>
  );
};

export default Column;
