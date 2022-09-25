import { Response, Request } from "express";
import Product from "../models/product.model";

export async function getAll(req: Request, res: Response) {
  const products = await Product.find();
  return res.json({ products });
}

export async function getOne(req: Request, res: Response) {
  const product = await Product.findById(req.params.id);
  return res.json({ product });
}
