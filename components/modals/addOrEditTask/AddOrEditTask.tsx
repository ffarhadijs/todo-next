import {
  Textarea,
  Box,
  TextInput,
  Button,
  Group,
  Select,
  Indicator,
  Text,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useQueryClient } from "react-query";
import { notifications } from "@mantine/notifications";
import { useAddTask, useEditTask } from "@/hooks/tasks/tasks.hooks";
import { forwardRef } from "react";

type Props = {
  close: () => void;
  col: any;
  task?: any;
};

const selectData = [
  {
    color: "red",
    label: "Bug",
    value: "bug",
    description: "Something isn't working",
  },
  {
    color: "teal",
    label: "Enhancement",
    value: "enhancement",
    description: "New feature or request",
  },
  {
    color: "pink",
    label: "Question",
    value: "question",
    description: "Further information is requested",
  },
  {
    color: "grape",
    label: "Duplicate",
    value: "duplicate",
    description: "This issue or pull request already exists",
  },
  {
    color: "orange",
    label: "Invalid",
    value: "invalid",
    description: "This doesn't seem right",
  },
  {
    color: "cyan",
    label: "Documentation",
    value: "documentation",
    description: "Improvements or additions to documentation",
  },
];
interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  color: string;
  label: string;
  description: string;
}

// eslint-disable-next-line react/display-name
const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ color, label, description, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Indicator color={color}> </Indicator>
        <div>
          <Text>{label}</Text>
          <Text size="xs" color="dimmed">
            {description}
          </Text>
        </div>
      </Group>
    </div>
  )
);

export default function AddOrEditTask({ close, col, task }: Props) {
  const useQuery = useQueryClient();
  const itemId = task?.id;

  const form = useForm({
    initialValues: {
      title: task?.title || "",
      description: task?.description || "",
      label: task?.label || "",
      category: task?.category || "",
    },
    validate: {
      title: isNotEmpty("You should input task title"),
    },
  });
  const formData = form.values;
  const data = {
    formData,
    status: col.id,
  };

  const { mutate, isLoading } = useAddTask(data, {
    onSuccess: () => {
      useQuery.invalidateQueries();
      form.reset();
      close();
      notifications.show({
        color: "green",
        title: "Add Task",
        message: "Task has been added successfully",
      });
    },
  });
  const { mutate: editTaskMutate, isLoading:editLoading } = useEditTask(col, itemId, formData, {
    onSuccess: () => {
      useQuery.invalidateQueries();
      form.reset();
      close();
      notifications.show({
        color: "green",
        title: "Edit Task",
        message: "Task has been updated successfully",
      });
    },
  });

  const submitHandler = () => {
    if (itemId) {
      editTaskMutate();
    } else {
      mutate();
    }
  };

  return (
    <Box component="form" onSubmit={form.onSubmit(submitHandler)}>
      <TextInput {...form.getInputProps("title")} label="Title" withAsterisk />
      <Textarea
        {...form.getInputProps("description")}
        label="Description"
        mt={"lg"}
      />
      <Select
        {...form.getInputProps("label")}
        itemComponent={SelectItem}
        data={selectData}
        label="Label"
        searchable
        placeholder="Pick Labels"
        clearable
        my={"lg"}
        nothingFound="There isn't any item"
      />
      <Select
        {...form.getInputProps("category")}
        data={["Front", "Back", "Data Science", "Design"]}
        label="Category"
        placeholder="Pick Category"
        clearable
        searchable
        nothingFound="There isn't any item"
      />
      <Group position="right" mt={"xl"}>
        <Button color="red" onClick={close}>
          Cancel
        </Button>
        <Button loading={isLoading||editLoading} color="teal" type="submit">
          Save
        </Button>
      </Group>
    </Box>
  );
}
