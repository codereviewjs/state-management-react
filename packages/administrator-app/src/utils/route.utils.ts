import { routes } from "../constants/routes.constants";

const replaceParamWithValue = (url: string, param: string, value: string) =>
  url.replace(param, value);

const replaceIdParamWithValue = (url: string, value: string) =>
  replaceParamWithValue(url, ":id", value);

export const routesWithParams = {
  reports: {
    report: (id: string) => replaceIdParamWithValue(routes.reports.report, id),
    reportEdit: (id: string) =>
      replaceIdParamWithValue(routes.reports.reportEdit, id),
  },
} as const;
