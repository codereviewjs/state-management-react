import { Response, Request } from "express";
import { BookModule } from "../models";

async function getAll(req: Request, res: Response) {
  const books = await BookModule.find();
  return res.json({ books });
}

async function getOne(req: Request, res: Response) {
  const book = await BookModule.findById(req.params.id);
  return res.json({ book });
}

export const bookController = {
  getAll,
  getOne,
};
