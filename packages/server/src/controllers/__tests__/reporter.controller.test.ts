import { reporterService } from "../../services/reporter.service";
import { reporterController } from "../reporter.controller";
import { REPORTER } from "../../test-utils/mockData";
import { request } from "../../test-utils/request";
import { reporterUtils } from "../../utils/reporter.utils";

describe("Reporter controller", () => {
  it("Should get all", async () => {
    const reporterServiceGetAllSpy = jest
      .spyOn(reporterService, "getAll")
      .mockImplementation(async () => {
        return [REPORTER];
      });

    const { next, req, res, resJsonMockFn } = request({
      res: {
        locals: {
          auth: null,
        },
      },
    });

    await reporterController.getAll(req, res, next);

    expect(reporterServiceGetAllSpy).toBeCalledTimes(1);
    expect(resJsonMockFn).toBeCalledTimes(1);
    expect(resJsonMockFn).toBeCalledWith({
      reporters: [reporterUtils.reporterToReporterDTO(REPORTER)],
    });
  });

  it("Should get one", async () => {
    const reporterServiceGetByIdSpy = jest
      .spyOn(reporterService, "getById")
      .mockImplementation(async () => {
        return REPORTER;
      });

    const { next, req, res, resJsonMockFn } = request({
      req: {
        params: {
          id: "1",
        },
      },
      res: {
        locals: {
          auth: null,
        },
      },
    });

    await reporterController.getOne(req, res, next);

    expect(reporterServiceGetByIdSpy).toBeCalledTimes(1);
    expect(resJsonMockFn).toBeCalledTimes(1);
    expect(resJsonMockFn).toBeCalledWith({
      reporter: reporterUtils.reporterToReporterDTO(REPORTER),
    });
  });

  it("Should delete one", async () => {
    const reporterServiceDeleteByIdSpy = jest
      .spyOn(reporterService, "deleteById")
      .mockImplementation(jest.fn());

    const { next, req, res, resJsonMockFn } = request({
      req: {
        params: {
          id: "1",
        },
      },
      res: {
        locals: {
          auth: null,
        },
      },
    });

    await reporterController.remove(req, res, next);

    expect(reporterServiceDeleteByIdSpy).toBeCalledTimes(1);
    expect(resJsonMockFn).toBeCalledTimes(1);
    expect(resJsonMockFn).toBeCalledWith({
      message: "deleted reporter",
      reporterId: "1",
    });
  });
});
