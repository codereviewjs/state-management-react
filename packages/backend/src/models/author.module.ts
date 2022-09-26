import mongoose from "mongoose";
import { IBook } from "./book.module";
const { Schema } = mongoose;

export interface IAuthor {
  name: string;
  books: IBook[];
}

const authorSchema = new Schema<IAuthor>({
  name: String,
  books: [
    {
      type: Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
});

const Author = mongoose.model("Author", authorSchema);
export default Author;
