import { IReporter } from "types";
import { api } from "./api";

export const reportersApi = {
  getAll: () => api.get<{ reporters: IReporter[] }>(`/reporter`),
  getOne: (id: string) => api.get<{ reporter: IReporter }>(`/reporter/${id}`),
  remove: (id: string) =>
    api.delete<{ reporter: IReporter }>(`/reporter/${id}`),
};
