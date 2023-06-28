import React from "react";
import Item from "./Item";
import { Flex, Box, TextInput, Button } from "@mantine/core";
import { Droppable } from "react-beautiful-dnd";
import { useForm } from "@mantine/form";
import axios from "axios";

interface ColumnProps {
  col: any
}

const Column: React.FC<ColumnProps> = ({ col }) => {
  const form = useForm({
    initialValues: {
      title: "",
    },
  });

  const submitHandler = (formData: any) => {
    const title = formData.title;
    const status = col.id;
    axios.post("/api/todo/addTodo", {
      title,
      status,
    });
  };
  return (
    <Droppable droppableId={col.id}>
      {(provided) => (
        <Flex direction={"column"} py={"24px"} px={"16px"} mt={"8px"}>
          <h2 style={{ margin: "0", padding: "0 16px" }}>{col.id}</h2>
          <Box
            {...provided.droppableProps}
            ref={provided.innerRef}
            sx={{
              backgroundColor: "green",
              borderRadius: 8,
              padding: 16,
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              marginTop: 8,
            }}
          >
            {col.list?.map((item:any, index:any) => (
              <Item key={item.title} item={item} index={index} />
            ))}
            {provided.placeholder}
            <form onSubmit={form.onSubmit(submitHandler)}>
              <TextInput {...form.getInputProps("title")} />
              <Button type="submit"> add </Button>
            </form>
          </Box>
        </Flex>
      )}
    </Droppable>
  );
};

export default Column;
