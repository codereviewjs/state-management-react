import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Reports from "../../pages/index";
import { reportsApi } from "api";
import { Categories } from "types";

describe("Page - reports", () => {
  it("Should show reports empty state", async () => {
    jest
      .spyOn(reportsApi, "getAll")
      .mockImplementation(async () => ({ reports: [] }));

    render(<Reports reports={[]} />);
    await waitFor(() => {
      expect(screen.getByText(/no reports/i)).toBeInTheDocument();
    });
  });

  it("Should show reports", async () => {
    const reports = [
      {
        category: Categories.FOOD,
        date: new Date("02.02.2022"),
        description: "description",
        likesCount: 1,
        reporterId: "123",
        reporterName: "reporter name",
        title: "title",
        _id: "1",
        isLiked: true,
      },
    ];

    jest.spyOn(reportsApi, "getAll").mockImplementation(async () => ({
      reports,
    }));

    render(<Reports reports={reports} />);
    await waitFor(() => {
      expect(screen.getAllByRole("article")).toHaveLength(1);
    });
  });
});
