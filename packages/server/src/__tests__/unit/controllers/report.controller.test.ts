import { expressRequestResponse } from "../../../test-utils/expressRequestResponse";
import { reportController } from "../../../controllers/report.controller";
import { reportService } from "../../../services/report.service";
import { REPORT } from "../../../test-utils/mockData";
import { reportUtils } from "../../../utils/report.utils";

describe("Report controller", () => {
  it("Should get all", async () => {
    const reportServiceGetAllSpy = jest
      .spyOn(reportService, "getAll")
      // @ts-expect-error
      .mockImplementation(async () => {
        return [REPORT];
      });

    const { next, req, res, resJsonMockFn } = expressRequestResponse({
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

    const { next, req, res, resJsonMockFn } = expressRequestResponse({
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

    const { next, req, res, resJsonMockFn } = expressRequestResponse({
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
