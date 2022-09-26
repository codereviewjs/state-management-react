import mongoose from "mongoose";
import { IBook } from "types";
const { Schema } = mongoose;

const bookSchema = new Schema<IBook>({
  author: String,
  country: String,
  language: String,
  link: String,
  pages: Number,
  title: String,
  year: Number,
});

const Book = mongoose.model("Book", bookSchema);
export default Book;
