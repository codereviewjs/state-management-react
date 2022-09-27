import mongoose from "mongoose";
import { ITheme } from "types";
const { Schema } = mongoose;

const themeSchema = new Schema<ITheme>({
  author: String,
  title: String,
  primaryColor: String,
  secondaryColor: String,
  textColor: String,
  backgroundColor: String,
});

const Theme = mongoose.model("Theme", themeSchema);
export default Theme;
