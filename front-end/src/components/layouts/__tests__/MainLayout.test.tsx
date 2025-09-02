import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { MainLayout } from "../MainLayout";
import { SnackbarProvider } from "@providers";

describe("MainLayout", () => {
  it("renders children content", () => {
    render(
      <MemoryRouter>
        <SnackbarProvider>
          <MainLayout>
            <div>Child Content</div>
          </MainLayout>
        </SnackbarProvider>
      </MemoryRouter>
    );
    expect(screen.getByText("Child Content")).toBeInTheDocument();
  });
});


