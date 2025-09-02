import { useState, type FC } from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import CancelIcon from "@mui/icons-material/Cancel";

import { TaskPriority, TaskStatus } from "@enums";
import { CustomButton, CustomTextField } from "@components";
import {
  Box,
  Divider,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector, useSnackbarContext } from "@hooks";
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
  const [advancedOptionsExpanded, setAdvancedOptionsExpanded] = useState(false);

  const dispatch = useAppDispatch();
  const snackbar = useSnackbarContext();
  const { control, handleSubmit, reset, resetField, watch } =
    useForm<ITaskSchema>({
      resolver: yupResolver(taskSchema),
      defaultValues,
    });
  const { createTaskLoading, updateTaskLoading } = useAppSelector(
    (state) => state.task
  );

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
              placeholder="Sample Task"
              label="Task Title *"
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
              label="Task Description *"
              fieldState={fieldState}
              multiline
            />
          )}
        />
        <Box className="advanced-options-container">
          <Box
            className="advanced-options-trigger"
            onClick={() => setAdvancedOptionsExpanded(!advancedOptionsExpanded)}
          >
            <Typography className="body-text">Advanced Options</Typography>
            <Divider orientation="horizontal" flexItem className="divider" />
            <IconButton className="expand-icon-button" size="small">
              <ExpandCircleDownOutlinedIcon
                className={`expand-icon ${
                  advancedOptionsExpanded ? "expanded" : ""
                }`}
              />
            </IconButton>
          </Box>
          <Box
            className={`advanced-options ${
              !advancedOptionsExpanded ? "collapsed" : ""
            }`}
          >
            <Controller
              control={control}
              name="taskPriority"
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  select
                  label="Task Priority *"
                  fullWidth
                  size="small"
                  error={fieldState.invalid}
                  helperText={fieldState.error?.message}
                >
                  {Object.values(TaskPriority).map((priority) => (
                    <MenuItem key={priority} value={priority}>
                      {priority}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            <Box
              sx={{ display: "flex", gap: 1, width: "100%" }}
              className="due-date-picker"
            >
              <Controller
                name="taskDueDate"
                control={control}
                render={({ field, fieldState }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileDatePicker
                      {...field}
                      label="Due Date"
                      value={field.value ? dayjs(field.value) : null}
                      onChange={(date) => {
                        field.onChange(date);
                      }}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          size: "small",
                          error: fieldState.invalid,
                          helperText: fieldState.error?.message,
                        },
                      }}
                      sx={{
                        flexGrow: 1,
                        transition: "all 0.5s ease",
                      }}
                      className={`date-picker ${
                        watch("taskDueDate") ? "with-clear-icon" : ""
                      }`}
                    />
                  </LocalizationProvider>
                )}
              />
              {watch("taskDueDate") && (
                <IconButton onClick={() => resetField("taskDueDate")}>
                  <CancelIcon />
                </IconButton>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
      <CustomButton
        type="submit"
        disabled={createTaskLoading || updateTaskLoading}
      >
        Add Task
      </CustomButton>
    </form>
  );
};
