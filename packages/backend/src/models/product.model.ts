import mongoose from "mongoose";
const { Schema } = mongoose;

export interface IProduct {
  title: string;
  price: number;
  category: "fruit" | "vegetable" | "meat" | "dairy";
  img: string;
}
const productSchema = new Schema<IProduct>({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ["fruit", "vegetable", "meat", "dairy"],
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
