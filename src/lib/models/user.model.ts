import { IUser } from "@/types";
import { model, Schema } from "mongoose";

const userSchema = new Schema<IUser>({
  id: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  image: String,
  bio: String,
  threads: [
    {
      type: Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
  onboarded: { type: Boolean, default: false },
  communities: [
    {
      type: Schema.Types.ObjectId,
      ref: "Community",
    },
  ],
});

const User = model<IUser>("User", userSchema);

export default User;
