import { IReporter } from "types";
import { api } from "./api";

export const reportersApi = {
  useGetAll: () => api.get<{ reporters: IReporter[] }>(`/reporter`),
  useGetOne: (name: string) =>
    api.get<{ reporter: IReporter }>(`/reporter/${name}`),
};
