import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  email: string,
  password: string
};

export const UserModel = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model<IUser>("User", UserModel);
export default User;

