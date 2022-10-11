import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Report from "../Report";
import * as storeContextModule from "../../../context/store/Store.context";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import { authApi, reportersApi, reportsApi } from "api";
import { Categories, IReportDTO, Roles } from "types";
import { routesWithParams } from "../../../utils/route.utils";
import { routes } from "../../../constants/routes.constants";
import { REPORT } from "../../../test-utils/fakeData";

const renderWithRouter = (
  ui: JSX.Element,
  {
    initialRoute,
    path,
  }: {
    initialRoute: string;
    path: string;
  }
) => {
  const wrapper = (
    <MemoryRouter initialEntries={[initialRoute]}>
      <Routes>
        <Route path={path} element={ui} />
      </Routes>
    </MemoryRouter>
  );

  return render(wrapper);
};

jest.mock("../../../context/store/Store.context");

describe("Report page tests", () => {
  it("should not display report", async () => {
    renderWithRouter(<Report />, {
      initialRoute: routesWithParams.reports.report("2"),
      path: routes.reports.report,
    });

    await waitFor(() => {
      expect(screen.getByText(/report not found/i)).toBeInTheDocument();
    });
  });

  it("should display report", async () => {
    renderWithRouter(<Report />, {
      initialRoute: routesWithParams.reports.report(REPORT._id || ""),
      path: routes.reports.report,
    });

    await waitFor(() => {
      expect(screen.getByText(REPORT.title)).toBeInTheDocument();
    });
  });
});
