import { IReport } from "types";
import { api } from "./api";

export const reportsApi = {
  getAll: () => api.get<{ reports: IReport[] }>(`/report`),
  getOne: (id: string) => api.get<{ report: IReport }>(`/report/${id}`),
};
