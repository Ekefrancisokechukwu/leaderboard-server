import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  googleId: string;
  name: string;
  email: string;
  profilePicture: string;
}

const UserSchema = new Schema<IUser>({
  googleId: {
    type: String,
    required: [true, "Please provide id"],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Please provide name"],
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true,
  },
  profilePicture: { type: String },
});

export default mongoose.model<IUser>("User", UserSchema);
