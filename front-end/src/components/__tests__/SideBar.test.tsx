import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { SideBar } from "../SideBar";

describe("SideBar", () => {
  it("renders navigation items", () => {
    render(
      <MemoryRouter>
        <SideBar />
      </MemoryRouter>
    );
    expect(screen.getByText(/tasks/i)).toBeInTheDocument();
    expect(screen.getByText(/settings/i)).toBeInTheDocument();
  });
});


