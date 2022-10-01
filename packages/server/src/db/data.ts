import {
  IReport,
  IReporter,
  IMetadata,
  Categories,
  ITheme,
  IAuth,
} from "types";
import { LoremIpsum } from "lorem-ipsum";

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

export const admin: IAuth = {
  email: "admin@gmail.com",
  password: "password",
  isLoggedIn: false,
  admin: true,
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

export const reporters: IReporter[] = [
  {
    firstName: "Haiden",
    lastName: "Roberson",
    email: "haidenRoberson@gmail.com",
    reports: [],
  },
  {
    firstName: "Imaad",
    lastName: "Ramirez",
    email: "imaadRamirez@gmail.com",
    reports: [],
  },
  {
    firstName: "Mandeep",
    lastName: "Fountain",
    email: "mandeepFountain@gmail.com",
    reports: [],
  },
  {
    firstName: "Rowena",
    lastName: "Patton",
    email: "rowenaPatton",
    reports: [],
  },
  {
    firstName: "Devin",
    lastName: "Easton",
    email: "devinEaston@gmail.com",
    reports: [],
  },
  {
    firstName: "Nana",
    lastName: "Wells",
    email: "nanaWells@gmail.com",
    reports: [],
  },
];

export const users: IAuth[] = [
  admin,
  ...reporters.map(
    (reporter, i) =>
      ({
        email: reporter.email,
        isLoggedIn: false,
        admin: false,
        password: `${reporter.firstName}-${reporter.lastName}-${i}`,
      } as IAuth)
  ),
];

function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomItemFromArray<T extends unknown[]>(arr: T) {
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
