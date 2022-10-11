import { Categories, IReportDTO } from "types";
import { REPORT } from "../../../test-utils/fakeData";

export const useStoreContext = () => {
  return {
    reports: {
      data: [REPORT] as IReportDTO[],
    },
    auth: {},
    deletedReport: jest.fn(),
  };
};
