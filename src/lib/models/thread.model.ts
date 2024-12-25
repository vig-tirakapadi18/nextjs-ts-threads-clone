import { model, models, Schema } from "mongoose";

const threadSchema = new Schema(
  {
    text: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    communityId: {
      type: Schema.Types.ObjectId,
      ref: "Community",
    },
    parentId: { type: String },
    children: { type: Schema.Types.ObjectId, ref: "Thread" },
  },
  { timestamps: true }
);

const Thread = models.Thread || model("Thread", threadSchema);

export default Thread;

/* 
// Parent Thread
    // -> Child Thread 1
    // -> Child Thread 2
    // -> Child Thread 3
        // -> Grand Child 1
        // -> Grand Child 2
*/
