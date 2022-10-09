import { expressRequestResponse } from "../../../test-utils/expressRequestResponse";
import { userController } from "../../../controllers/user.controller";
import { userService } from "../../../services/user.service";
import { USER, AUTH } from "../../../test-utils/mockData";
import { userUtils } from "../../../utils/user.utils";

describe("User controller", () => {
  it("me", async () => {
    const userServiceGetByAuthSpy = jest
      .spyOn(userService, "getByAuth")
      // @ts-expect-error
      .mockImplementation(async () => {
        return USER;
      });

    const { next, req, res, resJsonMockFn } = expressRequestResponse({
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
