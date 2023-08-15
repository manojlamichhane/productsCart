import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CustomButton from "./CustomButton";

describe("Button test", () => {
  test("Render check", () => {
    const onClick = jest.fn();
    const { asFragment } = render(
      <CustomButton title="Hello" handleClick={onClick} />
    );
    expect(screen.getByTestId("button")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
  test("Should display a button with given name", () => {
    const onClick = jest.fn();
    render(<CustomButton title="Hello" handleClick={onClick} />);

    expect(screen.getByText("Hello")).toBeInTheDocument();
  });
});
