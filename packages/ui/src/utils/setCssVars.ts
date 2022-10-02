import { ITheme } from "types";

type Colors = Omit<ITheme, "_id">;

export function setCssVars(theme: Colors) {
  const colors: (keyof Colors)[] = [
    "primaryColor",
    "secondaryColor",
    "backgroundColor",
    "textColor",
  ];

  colors.forEach((color) => {
    document.documentElement.style.setProperty(`--${color}`, theme[color]);
  });
}
