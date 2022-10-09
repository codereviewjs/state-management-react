import { userService } from "../../services/user.service";
import { userController } from "../user.controller";
import { AUTH, USER } from "../../test-utils/mockData";
import { request } from "../../test-utils/request";
import { userUtils } from "../../utils/user.utils";

describe("User controller", () => {
  it("me", async () => {
    const userServiceGetByAuthSpy = jest
      .spyOn(userService, "getByAuth")
      // @ts-expect-error
      .mockImplementation(async () => {
        return USER;
      });

    const { next, req, res, resJsonMockFn } = request({
      res: {
        locals: {
          auth: AUTH,
        },
      },
    });

    await userController.me(req, res, next);

    expect(userServiceGetByAuthSpy).toBeCalledTimes(1);
    expect(resJsonMockFn).toBeCalledTimes(1);
    expect(resJsonMockFn).toBeCalledWith({
      user: userUtils.userToUserDTO(USER),
    });
  });
});
