import { Categories, Roles } from "types";
import { LoremIpsum } from "lorem-ipsum";
import { IAuth } from "../models/auth.model";
import { IReport } from "../models/report.model";
import { IReporter } from "../models/reporter.model";

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
  firstName: "admin",
  lastName: "admin",
  password: "password",
  role: Roles.ADMIN,
};

export const reportersAuth: IAuth[] = [
  {
    firstName: "Haiden",
    lastName: "Roberson",
    email: "haidenRoberson@gmail.com",
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
].map((reporter) => ({
  ...reporter,
  password: "Password123!",
  role: Roles.REPORTER,
}));

export const reporters: IReporter[] = reportersAuth.map((reporterAuth) => ({
  reports: [],
  auth: reporterAuth,
}));

export const usersAuth: IAuth[] = [
  {
    email: "joni@gmail.com",
    firstName: "Joni",
    lastName: "Something",
  },
  {
    email: "rebecca@gmail.com",
    firstName: "Rebecca",
    lastName: "Else",
  },
].map((user) => ({
  ...user,
  password: "Password123!",
  role: Roles.USER,
}));

export const users: IAuth[] = [admin, ...reportersAuth, ...usersAuth];

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
