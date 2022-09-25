import mongoose from "mongoose";
const { Schema } = mongoose;

export interface IAuth {
  email: string;
  password: string;
  isLoggedIn: boolean;
}
const authSchema = new Schema<IAuth>({
  email: String,
  password: String,
  isLoggedIn: Boolean,
});

const Auth = mongoose.model("Auth", authSchema);
export default Auth;
