import { IUser } from "types";
import { api } from "./api";

export const authApi = {
  getSession: () => api.get<{ user: IUser; token: string }>("/auth/session"),
  login: (body: { email: string; password: string }) =>
    api.post<{ user: IUser; token: string }>(`/auth/login`, body),
  logout: () => api.delete(`/auth/logout`),
};
