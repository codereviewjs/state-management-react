import { Response, Request } from "express";
import { MetadataModule } from "../models";

async function getOne(req: Request, res: Response) {
  const [metadata] = await MetadataModule.find();
  return res.json({ metadata });
}

export const metadataController = {
  getOne,
};
