import { AuthResponse, IUser } from "types";
import { api } from "./api";

export const authApi = {
  getSession: () => api.get<AuthResponse>("/auth/session"),
  login: (body: { email: string; password: string }) =>
    api.post<AuthResponse>(`/auth/login`, body),
  logout: () => api.delete(`/auth/logout`),
};
