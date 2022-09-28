import { IReporter } from "./reporter.types";

export enum Categories {
  POLITICS = "POLITICS",
  SPORTS = "SPORTS",
  SCIENCE = "SCIENCE",
  FOOD = "FOOD",
  WEATHER = "WEATHER",
}
export interface IReport {
  title: string;
  description: string;
  date: Date;
  category: Categories;
  reporter: IReporter;
}
