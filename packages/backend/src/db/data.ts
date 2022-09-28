import { IReport, IReporter, IMetadata, Categories, ITheme } from "types";
import { LoremIpsum } from "lorem-ipsum";
import { IAuth } from "../models/auth.module";

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

export const user: IAuth = {
  email: "admin@gmail.com",
  password: "password",
  isLoggedIn: false,
};

const theme: ITheme = {
  backgroundColor: "#242424",
  primaryColor: "#646cff",
  secondaryColor: "#1a1a1a",
  textColor: "#ffffff",
};

export const metadata: IMetadata = {
  theme,
};

export const reporters = [
  { name: "Haiden Roberson", reports: [] },
  { name: "Imaad Ramirez", reports: [] },
  { name: "Mandeep Fountain", reports: [] },
  { name: "Rowena Patton", reports: [] },
  { name: "Devin Easton", reports: [] },
  { name: "Nana Wells", reports: [] },
] as IReporter[];

function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomItemFromArray<T extends any[]>(arr: T) {
  return arr[Math.floor(Math.random() * arr.length)] as T[number];
}
function randomDate(start = new Date(2012, 0, 1), end = new Date()) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

const categories: Categories[] = [
  Categories.FOOD,
  Categories.POLITICS,
  Categories.SCIENCE,
  Categories.SPORTS,
  Categories.WEATHER,
];

export const reports: IReport[] = Array.from({ length: 30 }).map(
  () =>
    ({
      category: getRandomItemFromArray(categories),
      reporter: getRandomItemFromArray(reporters),
      date: randomDate(),
      description: lorem.generateParagraphs(randomIntFromInterval(2, 5)),
      title: lorem.generateWords(randomIntFromInterval(1, 3)),
    } as IReport)
);
