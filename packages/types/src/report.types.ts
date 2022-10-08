import { IReporter } from "./reporter.types";

export enum Categories {
  POLITICS = "POLITICS",
  SPORTS = "SPORTS",
  SCIENCE = "SCIENCE",
  FOOD = "FOOD",
  WEATHER = "WEATHER",
}
export interface IReport {
  _id?: string;
  title: string;
  description: string;
  date: Date;
  category: Categories;
  reporter: IReporter;
}

export interface IReportDTO {
  _id?: string;
  title: string;
  description: string;
  date: Date;
  category: Categories;
  reporterId: string;
  reporterName: string;
}

export interface ICreateReportDTO
  extends Pick<IReport, "category" | "title" | "description"> {}
