import { models, Schema, model } from "mongoose";

const communitySchema = new Schema(
  {
    id: { type: String, required: true },
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
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Community = models.Community || model("Community", communitySchema);

export default Community;
