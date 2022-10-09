import { AuthResponse } from "types";
import { IAuthDocument } from "../../../models/auth.model";
import { authService } from "../../../services/auth.service";
import { authController } from "../../../controllers/auth.controller";
import { userService } from "../../../services/user.service";
import { IUser } from "../../../models/user.model";
import "../../../config";
import { authUtils } from "../../../utils/auth.utils";
import { userUtils } from "../../../utils/user.utils";
import { AUTH, TOKEN, USER } from "../../../test-utils/mockData";
import { expressRequestResponse } from "../../../test-utils/expressRequestResponse";

describe("Auth controller", () => {
  it("Should login regular user and return dto response", async () => {
    const authServiceLoginSpy = jest
      .spyOn(authService, "login")
      .mockImplementation(async (email, password) => {
        const auth = {
          ...AUTH,
          email,
          password,
        } as IAuthDocument;

        return {
          auth,
          token: TOKEN,
        };
      });

    const userServiceGetByAuthSpy = jest
      .spyOn(userService, "getByAuth")
      // @ts-expect-error
      .mockImplementation(async (auth) => {
        const user: IUser = {
          ...USER,
          auth,
        };
        return user;
      });

    const { next, req, res, resJsonMockFn } = expressRequestResponse({
      req: {
        body: {
          email: AUTH.email,
          password: AUTH.password,
        },
      },
    });

    await authController.login(req, res, next);

    expect(authServiceLoginSpy).toBeCalledTimes(1);
    expect(userServiceGetByAuthSpy).toBeCalledTimes(1);
    expect(resJsonMockFn).toBeCalledTimes(1);

    expect(resJsonMockFn).toBeCalledWith({
      auth: authUtils.authToAuthDTO(AUTH),
      user: userUtils.userToUserDTO(USER),
      token: TOKEN,
      reporter: undefined,
    } as AuthResponse);
  });

  it("Should get session", async () => {
    const createTokenSpy = jest.spyOn(authUtils, "createToken");
    const userServiceGetByAuthSpy = jest
      .spyOn(userService, "getByAuth")
      // @ts-expect-error
      .mockImplementation(async (auth) => {
        const user: IUser = {
          ...USER,
          auth,
        };
        return user;
      });

    const { next, req, res, resJsonMockFn } = expressRequestResponse({
      res: {
        locals: {
          auth: AUTH,
        },
      },
    });

    await authController.getSession(req, res, next);

    expect(userServiceGetByAuthSpy).toBeCalledTimes(1);
    expect(resJsonMockFn).toBeCalledTimes(1);

    expect(resJsonMockFn).toBeCalledTimes(1);
    expect(createTokenSpy).toBeCalledTimes(1);
  });
});
