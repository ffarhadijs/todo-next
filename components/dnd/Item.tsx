import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Box } from "@mantine/core";

interface ItemProps {
  item: any;
  index: number;
}

const Item = ({ item, index }: ItemProps) => {

  
  return (
    <Draggable draggableId={item.title} index={index}>
      {(provided) => (
        <Box
          sx={{
            backgroundColor: "#eee",
            borderRadius: 4,
            padding: "4px 8px",
            transition: "background-color .8s ease-out",
            marginTop: 8,

            ":hover": {
              backgroundColor: "#fff",
              transition: "background-color .1s ease-in",
            },
          }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {item.title}
        </Box>
      )}
    </Draggable>
  );
};

export default Item;
