import { useEffect, type FC } from "react";
import {
  Box,
  CircularProgress,
  Divider,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { CustomTabPanel, TaskCard, TaskForm } from "@components";
import { useAppDispatch, useAppSelector, useSnackbarContext } from "@hooks";
import { filterTasksAction } from "@redux-actions";
import { TaskStatus } from "@enums";

export const MainPage: FC = () => {
  const dispatch = useAppDispatch();
  const snackbar = useSnackbarContext();

  const fetchTasks = async (filterType: "all" | "recent" | "completed") => {
    try {
      const filterPageSize = filterType === "recent" ? 5 : undefined;
      const filterTaskStatus =
        filterType === "recent"
          ? TaskStatus.PENDING
          : filterType === "completed"
          ? TaskStatus.COMPLETED
          : undefined;
      await dispatch(
        filterTasksAction({
          page_size: filterPageSize,
          task_status: filterTaskStatus,
        })
      ).unwrap();
    } catch (error: string | any) {
      snackbar.showSnackbar(error || "Failed to fetch task data.", "error");
    }
  };

  useEffect(() => {
    fetchTasks("recent");
  }, []);
  return (
    <Box className="main-page">
      <Box className="task-form-container">
        <TaskForm />
      </Box>
      <Divider
        flexItem
        orientation="vertical"
        className="page-divider vertical"
      />
      <Divider
        flexItem
        orientation="horizontal"
        className="page-divider horizontal"
      />
      <Box className="task-list-container">
        <TextField
          variant="outlined"
          placeholder="  Search Tasks"
          sx={{
            background: "#F0F0F3",
            borderRadius: "10px",
            paddingLeft: "15px",
            fieldset: {
              border: "none",
            },
          }}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </InputAdornment>
            ),
          }}
        />

        <CustomTabPanel
          defaultTabIndex={1}
          tabs={[
            {
              label: "All",
              content: <TasksTab />,
              onLoad: () => fetchTasks("all"),
            },
            {
              label: "Recent",
              content: <TasksTab />,
              onLoad: () => fetchTasks("recent"),
            },
            {
              label: "Completed",
              content: <TasksTab />,
              onLoad: () => fetchTasks("completed"),
            },
          ]}
        />
      </Box>
    </Box>
  );
};

const TasksTab: FC = () => {
  const { tasks, getTasksLoading } = useAppSelector((state) => state.task);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "22px",
      }}
      className="card-container"
    >
      {!getTasksLoading &&
        tasks.map((task) => <TaskCard key={task.taskId} task={task} />)}
      {!getTasksLoading && tasks.length === 0 && (
        <Typography>No tasks found</Typography>
      )}
      {getTasksLoading && (
        <CircularProgress sx={{ alignSelf: "center", mt: 2 }} size={24} />
      )}
    </Box>
  );
};
