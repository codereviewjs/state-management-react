import React from "react";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
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
        likesCount: 0,
        reporterId: "123",
        reporterName: "reporter name",
        title: "title",
        _id: "1",
        isLiked: false,
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

  it("Should like report", async () => {
    const reports = [
      {
        category: Categories.FOOD,
        date: new Date("02.02.2022"),
        description: "description",
        likesCount: 0,
        reporterId: "123",
        reporterName: "reporter name",
        title: "title",
        _id: "1",
        isLiked: false,
      },
    ];

    jest.spyOn(reportsApi, "getAll").mockImplementation(async () => ({
      reports,
    }));

    const likeSpy = jest
      .spyOn(reportsApi, "like")
      .mockImplementation(async () => ({
        report: {
          ...reports[0],
          likesCount: 1,
          isLiked: true,
        },
      }));

    render(<Reports reports={reports} />);
    const likesContainer = await screen.findByTestId("likes-container");

    expect(within(likesContainer).getByText(/0/i)).toBeInTheDocument();
    const likeButton = within(likesContainer).getByRole("button", {
      name: /like/i,
    });
    fireEvent.click(likeButton);

    await waitFor(() => {
      expect(likeSpy).toBeCalledTimes(1);
    });

    expect(within(likesContainer).getByText(/1/i)).toBeInTheDocument();
  });
});
