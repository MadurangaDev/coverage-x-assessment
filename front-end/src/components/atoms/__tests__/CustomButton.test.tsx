import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CustomButton } from "../../atoms/CustomButton";

describe("CustomButton", () => {
  it("renders children text", () => {
    render(<CustomButton>Click Me</CustomButton>);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<CustomButton onClick={onClick}>Press</CustomButton>);
    await user.click(screen.getByRole("button", { name: /press/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("disables when loading", () => {
    render(<CustomButton isLoading>Load</CustomButton>);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});


