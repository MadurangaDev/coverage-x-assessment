import { render, screen } from "@testing-library/react";
import { CustomTextField } from "../CustomTextField";

describe("CustomTextField", () => {
  const fieldState = { invalid: false, isTouched: false, error: undefined } as any;
  it("renders label and placeholder", () => {
    render(
      <CustomTextField
        fieldState={fieldState}
        label="Task Title *"
        placeholder="Sample Task"
      />
    );
    expect(screen.getByLabelText(/task title/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/sample task/i)).toBeInTheDocument();
  });
});


