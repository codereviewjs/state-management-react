import { IReporterDTO } from "types";
import { api } from "./api";

export const reportersApi = {
  getAll: () => api.get<{ reporters: IReporterDTO[] }>(`/reporter`),
  getOne: (id: string) =>
    api.get<{ reporter: IReporterDTO }>(`/reporter/${id}`),
  remove: (id: string) =>
    api.delete<{ reporter: IReporterDTO }>(`/reporter/${id}`),
};
