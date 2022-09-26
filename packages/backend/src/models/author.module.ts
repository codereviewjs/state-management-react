import mongoose from "mongoose";
import { IAuthor } from "types";
const { Schema } = mongoose;

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
