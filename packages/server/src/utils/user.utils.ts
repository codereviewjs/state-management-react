import { IUserDTO } from "types";
import { IReport } from "../models/report.model";
import { IReporter } from "../models/reporter.model";
import { IUser } from "../models/user.model";
import { reportUtils } from "./report.utils";
import { reporterUtils } from "./reporter.utils";

function userToUserDTO(user: IUser): IUserDTO {
  return {
    likedReports: reportUtils.reportsToReportsDTO(
      user.likedReports as IReport[],
      user
    ),
    savedReporters: reporterUtils.reportersToReportersDTO(
      user.savedReporters as IReporter[]
    ),
    _id: user._id?.toString(),
  };
}

export const userUtils = {
  userToUserDTO,
};
