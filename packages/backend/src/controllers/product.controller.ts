import { Response, Request } from "express";

export function getAll(req: Request, res: Response) {
  return res.send("HI2");
}

export function getOne() {}
