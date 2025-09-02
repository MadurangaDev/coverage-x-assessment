import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { SnackbarProvider } from "@providers";
import { TaskCard } from "../TaskCard";
import { TaskStatus } from "@enums";
import { store } from "@redux";

const sampleTask = {
  taskId: "1",
  taskTitle: "Sample Task",
  taskDescription: "Description",
  taskPriority: "MEDIUM",
  taskStatus: "PENDING",
  taskCurrentStatus: TaskStatus.PENDING,
  taskDueDate: null,
} as any;

describe("TaskCard", () => {
  it("renders task title and description", () => {
    render(
      <Provider store={store}>
        <SnackbarProvider>
          <TaskCard task={sampleTask} />
        </SnackbarProvider>
      </Provider>
    );
    expect(screen.getByText(/sample task/i)).toBeInTheDocument();
    expect(screen.getByText(/description/i)).toBeInTheDocument();
  });
});


