import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";
import "@testing-library/jest-dom";

describe("Footer check", () => {
  test("Render footer", () => {
    const { asFragment } = render(<Footer />);
    expect(
      screen.getByText("@2023 Logo. All rights reserved")
    ).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
