import { type FC } from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { TaskPriority, TaskStatus } from "@enums";
import { CustomButton, CustomTextField } from "@components";
import { Box, Typography } from "@mui/material";
import { useAppDispatch, useSnackbarContext } from "@hooks";
import { createTaskAction, filterTasksAction } from "@redux-actions";

const taskSchema = Yup.object({
  taskTitle: Yup.string()
    .required("Task title is required")
    .max(50, "Task title cannot exceed 50 characters"),
  taskDescription: Yup.string()
    .required("Task description is required")
    .max(500, "Task description cannot exceed 500 characters"),
  taskPriority: Yup.mixed<TaskPriority>()
    .oneOf(Object.values(TaskPriority))
    .required("Task priority is required"),
  taskStatus: Yup.mixed<TaskStatus>()
    .oneOf(Object.values(TaskStatus))
    .required("Task status is required"),
  taskDueDate: Yup.date().required("Task due date is required").nullable(),
});
export type ITaskSchema = Yup.InferType<typeof taskSchema>;

const defaultValues: ITaskSchema = {
  taskTitle: "",
  taskDescription: "",
  taskPriority: TaskPriority.MEDIUM,
  taskStatus: TaskStatus.PENDING,
  taskDueDate: null,
};

export const TaskForm: FC = () => {
  const dispatch = useAppDispatch();
  const snackbar = useSnackbarContext();
  const { control, handleSubmit, reset } = useForm<ITaskSchema>({
    resolver: yupResolver(taskSchema),
    defaultValues,
  });

  const handleOnSubmit = async (formData: ITaskSchema) => {
    try {
      const res = await dispatch(
        createTaskAction({
          ...formData,
          taskDueDate:
            formData.taskDueDate?.toISOString().split("T")[0] || null,
          taskCurrentStatus: formData.taskStatus,
        })
      ).unwrap();
      if (res) {
        reset();
        snackbar.showSnackbar("Task created successfully", "success");
        await dispatch(
          filterTasksAction({
            page_size: 5,
            task_status: TaskStatus.PENDING,
          })
        ).unwrap();
      } else {
        snackbar.showSnackbar("No data returned from task creation", "error");
      }
    } catch (error: string | any) {
      snackbar.showSnackbar(error || "Create task failed", "error");
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit(handleOnSubmit)}>
      <Typography className="heading-h1 task-form-title">Add a Task</Typography>
      <Box className="input-container">
        <Controller
          control={control}
          name="taskTitle"
          render={({ field, fieldState }) => (
            <CustomTextField
              {...field}
              type="text"
              placeholder="John Doe"
              label="Task Title"
              fieldState={fieldState}
            />
          )}
        />
        <Controller
          control={control}
          name="taskDescription"
          render={({ field, fieldState }) => (
            <CustomTextField
              {...field}
              type="text"
              placeholder="Enter task description"
              label="Task Description"
              fieldState={fieldState}
              multiline
            />
          )}
        />
      </Box>
      <CustomButton type="submit">Add Task</CustomButton>
    </form>
  );
};
