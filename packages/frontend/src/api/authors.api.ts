import { IAuthor } from "types";
import { api } from "./api";

export const authorsApi = {
  useGetAll: () => api.get<{ authors: IAuthor[] }>(`/author`),
  useGetOne: (name: string) => api.get<{ author: IAuthor }>(`/author/${name}`),
};
