import { ITheme } from "types";

export const defaultTheme: ITheme = {
  author: "none",
  title: "Default",
  backgroundColor: "#242424",
  primaryColor: "#646cff",
  secondaryColor: "#1a1a1a",
  textColor: "#ffffff",
};

export const colors: (keyof Pick<
  ITheme,
  "backgroundColor" | "primaryColor" | "textColor" | "secondaryColor"
>)[] = ["primaryColor", "secondaryColor", "backgroundColor", "textColor"];
