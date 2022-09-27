import { IBook } from "types";
import { api } from "./api";

export const booksApi = {
  useGetAll: () => api.get<{ books: IBook[] }>(`/book`),
  useGetOne: (name: string) => api.get<{ book: IBook }>(`/book/${name}`),
};
