import { IReporter } from "types";
import { api } from "./api";

export const reportersApi = {
  getAll: () => api.get<{ reporters: IReporter[] }>(`/reporter`),
  getOne: (name: string) =>
    api.get<{ reporter: IReporter }>(`/reporter/${name}`),
};
