import { useEffect, type FC } from "react";
import { Box, CircularProgress, Divider, Typography } from "@mui/material";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";

import { TaskCard, TaskForm } from "@components";
import { useAppDispatch, useAppSelector, useSnackbarContext } from "@hooks";
import { filterTasksAction } from "@redux-actions";
import { TaskStatus } from "@enums";

export const MainPage: FC = () => {
  const dispatch = useAppDispatch();
  const snackbar = useSnackbarContext();
  const { tasks, getTasksLoading } = useAppSelector((state) => state.task);

  const fetchTasks = async () => {
    try {
      await dispatch(
        filterTasksAction({
          page_size: 5,
          task_status: TaskStatus.PENDING,
        })
      ).unwrap();
    } catch (error: string | any) {
      snackbar.showSnackbar(error || "Failed to fetch task data.", "error");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Box className="main-page">
      <Box className="task-form-container">
        <TaskForm />
      </Box>
      <Divider flexItem orientation="vertical" className="page-divider" />
      <Box className="task-list-container">
        {!getTasksLoading &&
          tasks.map((task) => <TaskCard key={task.taskId} task={task} />)}
        {!getTasksLoading && tasks.length === 0 && (
          <Typography>No pending tasks found</Typography>
        )}
        {getTasksLoading && (
          <CircularProgress sx={{ alignSelf: "center", mt: 2 }} size={24} />
        )}
        <Tabs
          aria-label="tabs"
          defaultValue={1}
          sx={{ bgcolor: "transparent" }}
        >
          <TabList
            disableUnderline
            sx={{
              p: 0.5,
              gap: 0.5,
              borderRadius: "xl",
              bgcolor: "background.level1",
              [`& .${tabClasses.root}[aria-selected="true"]`]: {
                boxShadow: "sm",
                bgcolor: "background.surface",
              },
            }}
          >
            <Tab disableIndicator>All</Tab>
            <Tab disableIndicator>Recent</Tab>
            <Tab disableIndicator>Completed</Tab>
          </TabList>
        </Tabs>
      </Box>
    </Box>
  );
};
