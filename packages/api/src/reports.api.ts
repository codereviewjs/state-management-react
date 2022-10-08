import { ICreateReportDTO, IReportDTO } from "types";
import { api } from "./api";

export const reportsApi = {
  getAll: () => api.get<{ reports: IReportDTO[] }>(`/report`),
  getOne: (id: string) => api.get<{ report: IReportDTO }>(`/report/${id}`),
  remove: (id: string) => api.delete<{ report: IReportDTO }>(`/report/${id}`),
  update: (id: string, report: IReportDTO) =>
    api.put<{ report: IReportDTO }>(`/report/${id}`, { report }),
  create: (report: ICreateReportDTO) =>
    api.post<{ report: IReportDTO }>(`/report`, { report }),
  getAuthReports: () =>
    api.get<{ reports: IReportDTO[] }>(`/report/authReports`),
};
