import mongoose from "mongoose";
import { IAuthor } from "types";
const { Schema } = mongoose;

const authorSchema = new Schema<IAuthor>({
  name: String,
  themes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Theme",
    },
  ],
});

const Author = mongoose.model("Author", authorSchema);
export default Author;
