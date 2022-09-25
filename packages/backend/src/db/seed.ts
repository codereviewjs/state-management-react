import { disconnect } from "mongoose";
import { connect } from "../config/mongo";
import AuthModule, { IAuth } from "../models/auth.module";
import ProductModule, { IProduct } from "../models/product.model";

const user: IAuth = {
  email: "admin@gmail.com",
  password: "password",
  isLoggedIn: false,
};

function createProduct(
  title: string,
  price: number,
  category: IProduct["category"],
  img: string
) {
  return {
    title,
    price,
    category,
    img,
  };
}
const products = [
  createProduct(
    "Apple",
    2.99,
    "fruit",
    "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3540&q=80"
  ),
  createProduct(
    "Cucumber",
    1.99,
    "vegetable",
    "https://images.unsplash.com/photo-1587313170527-446f86d0c3d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3560&q=80"
  ),
  createProduct(
    "Milk",
    1.99,
    "dairy",
    "https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3356&q=80"
  ),
];

async function seed() {
  connect(async (err) => {
    try {
      if (err) throw err;

      await AuthModule.deleteMany();
      console.log("Deleted all auth");

      await ProductModule.deleteMany();
      console.log("Deleted all products");

      await AuthModule.create(user);
      console.log("Created user");

      await ProductModule.insertMany(products);
      console.log("Created products");
    } catch (e: any) {
      console.error("Seed failed");
      console.error(e.message);
    } finally {
      await disconnect();
    }
  });
}

seed();
