import { IUser, IUserDTO } from "types";
import { reportUtils } from "./report.utils";
import { reporterUtils } from "./reporter.utils";

function userToUserDTO(user: IUser): IUserDTO {
  return {
    likedReports: reportUtils.reportsToReportsDTO(user.likedReports),
    savedReporters: reporterUtils.reportersToReportersDTO(user.savedReporters),
    _id: user._id,
  };
}

export const userUtils = {
  userToUserDTO,
};
