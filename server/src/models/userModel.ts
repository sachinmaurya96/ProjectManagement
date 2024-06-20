import mongoose, { Document, Schema, Types } from "mongoose";

interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  username: string;
  password: string;
  role: string;
  email:string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ["user", "admin"], default: "user" },
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;
