import { ICreateReportDTO, IReport } from "types";
import { api } from "./api";

export const reportsApi = {
  getAll: () => api.get<{ reports: IReport[] }>(`/report`),
  getOne: (id: string) => api.get<{ report: IReport }>(`/report/${id}`),
  remove: (id: string) => api.delete<{ report: IReport }>(`/report/${id}`),
  update: (id: string, report: IReport) =>
    api.put<{ report: IReport }>(`/report/${id}`, { report }),
  create: (report: ICreateReportDTO) =>
    api.post<{ report: IReport }>(`/report`, { report }),
  getAuthReports: () => api.get<{ reports: IReport[] }>(`/report/authReports`),
};
