import { ITheme } from "types";
import { api } from "./api";

export const themeApi = {
  useGetAll: () => api.get<{ themes: ITheme[] }>(`/theme`),
  useGetOne: (name: string) => api.get<{ theme: ITheme }>(`/theme/${name}`),
};
