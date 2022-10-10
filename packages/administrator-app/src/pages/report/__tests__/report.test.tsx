import React from "react";
import { render } from "@testing-library/react";
import Report from "../Report";
import StoreContextProvider from "../../../context/store/Store.context";
import { BrowserRouter } from "react-router-dom";

const setup = (ui: JSX.Element) => {
  const wrapper = (
    <StoreContextProvider>
      <BrowserRouter>{ui}</BrowserRouter>
    </StoreContextProvider>
  );

  return render(wrapper);
};

describe("Report page tests", () => {
  it("test", () => {
    setup(<Report />);
  });
});
