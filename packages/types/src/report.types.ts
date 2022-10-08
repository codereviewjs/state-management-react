export enum Categories {
  POLITICS = "POLITICS",
  SPORTS = "SPORTS",
  SCIENCE = "SCIENCE",
  FOOD = "FOOD",
  WEATHER = "WEATHER",
}

export interface IReportDTO {
  _id?: string;
  title: string;
  description: string;
  date: Date;
  category: Categories;
  reporterId: string;
  reporterName: string;
  likesCount: number;
  isLiked?: boolean;
}

export interface ICreateReportDTO
  extends Pick<IReportDTO, "category" | "title" | "description"> {}
