import Column from "@/components/dnd/Column";
import verifyToken from "@/utils/verifyToken";
import {
  Grid,
  ScrollArea,
  Center,
  Loader,
  Button,
  Modal,
  Title,
  Flex,
  useMantineTheme,
  ActionIcon,
  Divider,
} from "@mantine/core";
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
import { notifications } from "@mantine/notifications";
import { FiPlus } from "react-icons/fi";
import { useDisclosure } from "@mantine/hooks";
import AddOrEditCard from "@/components/modals/addOrEditCard/AddOrEditCard";
import Head from "next/head";

export default function Dashboard() {
  const theme = useMantineTheme();
  const [columns, setColumns] = useState<any>();
  const [opened, { open, close }] = useDisclosure(false);
  const [card, setCard] = useState<any>();

  const { isLoading: isFetching } = useGetTasks({
    onSuccess: (data: any) => {
      setColumns(data?.data?.data);
    },
  });

  const { mutate } = useMutation({
    mutationFn: (data) => axios.post("/api/task/updateColumn", data),
    onError: (error: any) => {
      notifications.show({
        color: "red",
        title: "Error",
        message: error?.response?.data?.message,
      });
    },
  });

  const { mutate: updateColumnsMutate } = useMutation({
    mutationFn: (data) => axios.post("/api/task/updateColumns", data),
    onError: (error: any) => {
      notifications.show({
        color: "red",
        title: "Error",
        message: error?.response?.data?.message,
      });
    },
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

  const addCardHandler = () => {
    open();
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Head>
        <title>Task-Next|Main page</title>
        <meta name="description" content="Manage tasks with drag and drop" />
      </Head>
      <Modal opened={opened} onClose={close} title="Add Card">
        <AddOrEditCard close={close} />
      </Modal>
      <ScrollArea h={"83vh"} type="auto" w={"100%"} offsetScrollbars>
        {isFetching ? (
          <Center>
            <Loader />
          </Center>
        ) : (
          <Grid mx={"auto"} mt={"20px"} sx={{ gap: "8px", flexWrap: "nowrap" }}>
            {columns?.map((col: any) => (
              <Grid.Col span={"auto"} w={"300px"} key={col.columnId}>
                <Column col={col} key={col.id} card={card} setCard={setCard} />
              </Grid.Col>
            ))}
            <Grid.Col span={"auto"} w={"300px"}>
              <ScrollArea h={"72vh"} offsetScrollbars pb={5}>
                <Flex
                  direction={"column"}
                  py={"16px"}
                  px={"16px"}
                  sx={{
                    backgroundColor:
                      theme.colorScheme === "dark"
                        ? theme.colors.dark[5]
                        : theme.colors.gray[2],
                    borderRadius: 8,
                    flexGrow: 1,
                    marginTop: 8,
                    border: "1px dashed gray",
                    height: "68vh",
                  }}
                >
                  <Title order={3}> Add Card </Title>
                  <Divider mt={"xs"} />
                  <ActionIcon
                    sx={{
                      height: "100%",
                      width: "100%",
                    }}
                    onClick={addCardHandler}
                  >
                    <FiPlus size={"40px"} />
                  </ActionIcon>
                </Flex>
              </ScrollArea>
            </Grid.Col>
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
