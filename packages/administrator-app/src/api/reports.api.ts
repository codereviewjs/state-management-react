import { IReport } from "types";
import { api } from "./api";

export const reportsApi = {
  useGetAll: () => api.get<{ reports: IReport[] }>(`/report`),
  useGetOne: (id: string) => api.get<{ report: IReport }>(`/report/${id}`),
};
