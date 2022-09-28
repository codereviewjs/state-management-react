import mongoose from "mongoose";
import { IMetadata } from "types";
const { Schema } = mongoose;

const metadataSchema = new Schema<IMetadata>({
  theme: {
    primaryColor: String,
    secondaryColor: String,
    textColor: String,
    backgroundColor: String,
  },
});

const Metadata = mongoose.model("Metadata", metadataSchema);
export default Metadata;
