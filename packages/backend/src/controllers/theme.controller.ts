import { Response, Request } from "express";
import { ThemeModule } from "../models";

async function getAll(req: Request, res: Response) {
  const themes = await ThemeModule.find();
  return res.json({ themes });
}

async function getOne(req: Request, res: Response) {
  const theme = await ThemeModule.findById(req.params.id);
  return res.json({ theme });
}

export const themeController = {
  getAll,
  getOne,
};
