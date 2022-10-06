export const routes = {
  main: {
    root: "/",
  },
  reports: {
    root: "/report",
    report: "/report/:id",
    reportEdit: "/report/:id/edit",
    reportCreate: "/report/create",
  },
} as const;
