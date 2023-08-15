import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import FilterCategory from "./FilterCategory";

describe("FilterCategory test", () => {
  test("Render check", () => {
    const { asFragment } = render(<FilterCategory />);
    expect(asFragment()).toMatchSnapshot();
  });
});
