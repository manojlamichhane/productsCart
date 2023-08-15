import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CustomInput from "./CustomInput";

describe("Input test", () => {
  test("Render check", () => {
    const { asFragment } = render(<CustomInput />);
    expect(screen.getByTestId("input")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
  test("Should render with given placeholder", () => {
    render(<CustomInput placeholder="user" />);
    expect(screen.getByPlaceholderText("user")).toBeInTheDocument();
  });
  test("Should render with given value", () => {
    const handleChange = jest.fn();
    render(<CustomInput value="User" handleChange={handleChange} />);
    expect(screen.getByDisplayValue("User")).toBeInTheDocument();
  });
});
