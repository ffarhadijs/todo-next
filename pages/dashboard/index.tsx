import Column from "@/components/dnd/Column";
import verifyToken from "@/utils/verifyToken";
import { Grid, ScrollArea, Center, Loader } from "@mantine/core";
import { useState } from "react";
import {
  DragDropContext,
  DropResult,
  resetServerContext,
} from "react-beautiful-dnd";
import { connectDB } from "@/utils/connectDB";
import axios from "axios";
import { useGetTasks } from "@/hooks/tasks/tasks.hooks";
import { useMutation } from "react-query";

export default function Dashboard() {
  const [columns, setColumns] = useState<any>();

  const { isLoading } = useGetTasks({
    onSuccess: (data: any) => {
      setColumns(data?.data?.data);
    },
  });

  const { mutate } = useMutation({
    mutationFn: (data) => axios.post("/api/task/updateColumn", data),
  });

  const { mutate: updateColumnsMutate } = useMutation({
    mutationFn: (data) => axios.post("/api/task/updateColumns", data),
  });

  const onDragEnd = ({ source, destination }: DropResult) => {
    // Make sure we have a valid destination
    if (destination === undefined || destination === null) return null;

    // Make sure we're actually moving the item
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return null;

    // Set start and end variables
    const start = columns?.find((item: any) => item.id === source.droppableId);
    const end = columns?.find(
      (item: any) => item.id === destination.droppableId
    );

    // If start is the same as end, we're in the same column
    if (start === end) {
      // Move the item within the list
      // Start by making a new list without the dragged item
      const newList = start?.list?.filter(
        (_: any, idx: number) => idx !== source.index
      );

      // Then insert the item at the right location
      newList?.splice(destination.index, 0, start.list[source.index]);

      // Then create a new copy of the column object
      const newCol = {
        columnId: start?.columnId,
        id: start?.id,
        list: newList,
      };
      const id = start.id;
      // Update the state
      const newColumn = [...columns];
      const columnIndex = columns?.findIndex(
        (item: any) => item.id === source.droppableId
      );
      newColumn[columnIndex] = newCol;
      setColumns(newColumn);
      const data = { newList, id };
      mutate(data as any);
      return null;
    } else {
      // If start is different from end, we need to update multiple columns
      // Filter the start list like before
      const newStartList = start.list.filter(
        (_: any, idx: number) => idx !== source.index
      );

      // Create a new start column
      const newStartCol = {
        columnId: start?.columnId,
        id: start.id,
        list: newStartList,
      };
      const startId = start.id;
      // Make a new end list array
      const newEndList = end.list;

      // Insert the item into the end list
      newEndList.splice(destination.index, 0, start.list[source.index]);

      // Create a new end column
      const newEndCol = {
        columnId: end?.columnId,
        id: end.id,
        list: newEndList,
      };
      const endId = end.id;
      // Update the state
      setColumns((state: any) => ({
        ...state,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      }));

      const newColumn = [...columns];
      const newStartColIndex = columns.findIndex(
        (item: any) => item.id === source.droppableId
      );
      const newEndColIndex = columns.findIndex(
        (item: any) => item.id === destination.droppableId
      );
      newColumn[newStartColIndex] = newStartCol;
      newColumn[newEndColIndex] = newEndCol;
      setColumns(newColumn);

      const data = {
        newStartList,
        newEndList,
        startId,
        endId,
      };

      updateColumnsMutate(data as any);

      return null;
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ScrollArea h={"80vh"} type="auto" w={"100%"} offsetScrollbars>
        {isLoading ? (
          <Center>
            <Loader />
          </Center>
        ) : (
          <Grid mx={"auto"} w={"1000px"} sx={{ gap: "8px" }}>
            {columns?.map((col: any) => (
              <Grid.Col span={"auto"} key={col.columnId}>
                <Column col={col} key={col.id} />
              </Grid.Col>
            ))}
          </Grid>
        )}
      </ScrollArea>
    </DragDropContext>
  );
}

export async function getServerSideProps(context: any) {
  const { token } = context.req.cookies;
  const secretKey = process.env.SECRET_KEY;
  await connectDB();
  resetServerContext();
  const { email } = await verifyToken(token, secretKey!);

  if (!email) {
    return {
      redirect: { destination: "/signin", permanent: false },
    };
  } else {
    return {
      props: {
        email,
      },
    };
  }
}
