import { reportService } from "../../services/report.service";
import { reportController } from "../report.controller";
import { reportUtils } from "../../utils/report.utils";
import { REPORT } from "../../test-utils/mockData";
import { request } from "../../test-utils/request";

describe("Report controller", () => {
  it("Should get all", async () => {
    const reportServiceGetAllSpy = jest
      .spyOn(reportService, "getAll")
      // @ts-expect-error
      .mockImplementation(async () => {
        return [REPORT];
      });

    const { next, req, res, resJsonMockFn } = request({
      res: {
        locals: {
          auth: null,
        },
      },
    });

    await reportController.getAll(req, res, next);

    expect(reportServiceGetAllSpy).toBeCalledTimes(1);
    expect(resJsonMockFn).toBeCalledTimes(1);
    expect(resJsonMockFn).toBeCalledWith({
      reports: [reportUtils.reportToReportDTO(REPORT, null)],
    });
  });

  it("Should get one", async () => {
    const reportServiceGetOneSpy = jest
      .spyOn(reportService, "getOne")
      // @ts-expect-error
      .mockImplementation(async () => {
        return REPORT;
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

    await reportController.getOne(req, res, next);

    expect(reportServiceGetOneSpy).toBeCalledTimes(1);
    expect(resJsonMockFn).toBeCalledTimes(1);
    expect(resJsonMockFn).toBeCalledWith({
      report: reportUtils.reportToReportDTO(REPORT, null),
    });
  });

  it("Should delete one", async () => {
    const reportServiceDeleteSpy = jest
      .spyOn(reportService, "deleteById")
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

    await reportController.remove(req, res, next);

    expect(reportServiceDeleteSpy).toBeCalledTimes(1);
    expect(resJsonMockFn).toBeCalledTimes(1);
    expect(resJsonMockFn).toBeCalledWith({
      message: "deleted report",
      reportId: "1",
    });
  });
});
