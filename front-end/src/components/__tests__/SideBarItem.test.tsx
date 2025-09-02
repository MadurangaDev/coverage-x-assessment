import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import BallotIcon from "@mui/icons-material/Ballot";
import { SideBarItem } from "../atoms/SideBarItem";

describe("SideBarItem", () => {
  it("renders label and icon", () => {
    render(
      <MemoryRouter>
        <SideBarItem label="Tasks" icon={BallotIcon} to="/" active />
      </MemoryRouter>
    );
    expect(screen.getByText("Tasks")).toBeInTheDocument();
  });

  it("renders disabled variant without link when disabled", () => {
    render(
      <MemoryRouter>
        <SideBarItem
          label="Settings"
          icon={BallotIcon}
          to="/settings"
          active={false}
          disabled
        />
      </MemoryRouter>
    );
    const label = screen.getByText("Settings");
    expect(label.closest("a")).toBeNull();
  });
});


