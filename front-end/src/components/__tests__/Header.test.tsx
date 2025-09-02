import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Header } from "../Header";
import { SnackbarProvider } from "@providers";

describe("Header", () => {
  it("renders app title and subtitle", () => {
    render(
      <MemoryRouter>
        <SnackbarProvider>
          <Header />
        </SnackbarProvider>
      </MemoryRouter>
    );
    expect(screen.getByText(/task sparks/i)).toBeInTheDocument();
    expect(screen.getByText(/the task manager/i)).toBeInTheDocument();
  });
});


