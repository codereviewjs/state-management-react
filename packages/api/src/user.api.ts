import { IUserDTO } from "types";
import { api } from "./api";

export const userApi = {
  me: (headers?: { authorization: string }) =>
    api.get<{ user: IUserDTO }>("/user/me", { headers }),
};
