import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import CartProductCard from "./CartProductCard";
import { Provider } from "react-redux";
import { store } from "./../../app/Redux/store";

describe("CartProductCard test", () => {
  test("Render check", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <CartProductCard />
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
