import { Response, Request } from "express";
import { AuthorModule } from "../models";

async function getAll(req: Request, res: Response) {
  const authors = await AuthorModule.find();
  return res.json({ authors });
}

async function getOne(req: Request, res: Response) {
  const author = await AuthorModule.findById(req.params.id);
  return res.json({ author });
}

export const authorController = {
  getAll,
  getOne,
};
