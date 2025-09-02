import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { SnackbarProvider } from "@providers";
import { TaskForm } from "../TaskForm";
import { store } from "@redux";

describe("TaskForm", () => {
  it("renders form title and submit button", () => {
    render(
      <Provider store={store}>
        <SnackbarProvider>
          <TaskForm />
        </SnackbarProvider>
      </Provider>
    );
    expect(screen.getByText(/add a task/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add task/i })).toBeInTheDocument();
  });
});


