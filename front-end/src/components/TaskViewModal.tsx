import type { FC } from "react";
import { Box, IconButton, Typography } from "@mui/material";

import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";

import { CustomButton, CustomModal } from "@components";
import { TaskStatus } from "@enums";
import type { ITask } from "@interfaces";

interface ITaskViewModalProps {
  open: boolean;
  onClose: () => void;
  task: ITask;
}

export const TaskViewModal: FC<ITaskViewModalProps> = ({
  open,
  onClose,
  task,
}) => {
  return (
    <CustomModal
      onClose={onClose}
      open={open}
      minWidth={{
        xs: "calc(100% - 32px)",
        sm: "480px",
        md: "512px",
      }}
      title={task.taskTitle}
      renderTitle={(title) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            pl: { xs: "4px", sm: "12px" },
            width: "100%",
          }}
        >
          <Typography variant="h6" fontSize={{ xs: "18px", sm: "20px" }}>
            {title}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography
              variant="body2"
              color="textSecondary"
              fontSize={{ xs: "14px", sm: "15px" }}
              sx={{
                textTransform: "capitalize",
              }}
            >
              {task.taskPriority} Priority
            </Typography>
            {task.taskDueDate && (
              <Typography
                variant="body2"
                color="textSecondary"
                fontSize={{ xs: "14px", sm: "15px" }}
              >
                Due on {new Date(task.taskDueDate).toISOString().split("T")[0]}
              </Typography>
            )}
          </Box>
        </Box>
      )}
    >
      <Box className="task-view-modal-content">
        <Typography variant="body2">{task.taskDescription}</Typography>
        <Box className="task-view-modal-buttons">
          <CustomButton
            icon={<CheckIcon />}
            // onClick={markAsDone}
            className="done-button"
            disabled={task.taskCurrentStatus === TaskStatus.COMPLETED}
          >
            Done
          </CustomButton>
          <IconButton
            className="task-card-delete-button"
            // onClick={() => setOpenViewModal(true)}
          >
            <DeleteIcon className="delete-icon" />
          </IconButton>
        </Box>
      </Box>
    </CustomModal>
  );
};
