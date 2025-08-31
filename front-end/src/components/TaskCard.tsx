import { type FC } from "react";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckIcon from "@mui/icons-material/Check";

import { CustomButton } from "@components";
import type { ITask } from "@interfaces";
import { TaskStatus } from "@enums";
import { useAppDispatch, useAppSelector, useSnackbarContext } from "@hooks";
import { filterTasksAction, updateTaskAction } from "@redux-actions";

interface ITaskCardProps {
  task: ITask;
  className?: string;
}

export const TaskCard: FC<ITaskCardProps> = ({ task, className = "" }) => {
  const dispatch = useAppDispatch();
  const snackbar = useSnackbarContext();

  const markAsDone = async () => {
    try {
      const res = await dispatch(
        updateTaskAction({
          ...task,
          taskCurrentStatus: TaskStatus.COMPLETED,
        })
      ).unwrap();
      if (res) {
        snackbar.showSnackbar("Status updated successfully", "success");
        await dispatch(
          filterTasksAction({
            page_size: 5,
            task_status: TaskStatus.PENDING,
          })
        ).unwrap();
      } else {
        snackbar.showSnackbar("Status update failed", "error");
      }
    } catch (error: string | any) {
      snackbar.showSnackbar(error || "Status update failed", "error");
    }
  };

  return (
    <Box key={task.taskId} className={`task-card ${className}`}>
      <Box className="task-card-container">
        <RadioButtonUncheckedIcon />
        <Box className="task-card-content">
          <Typography variant="h6" className="task-card-title">
            {task.taskTitle}
          </Typography>
          <Typography variant="body2" className="task-card-description">
            {task.taskDescription}
          </Typography>
          <Box className="task-card-button-container">
            <CustomButton icon={<CheckIcon />} onClick={markAsDone}>
              Done
            </CustomButton>
            <IconButton>
              <VisibilityIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Divider flexItem className="task-card-divider" />
    </Box>
  );
};
