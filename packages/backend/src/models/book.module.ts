import mongoose from "mongoose";
const { Schema } = mongoose;

export interface IBook {
  author: string;
  country: string;
  language: string;
  link: string;
  pages: number;
  title: string;
  year: number;
}

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
