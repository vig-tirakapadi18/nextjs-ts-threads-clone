import { model } from "mongoose";
import { models, Schema } from "mongoose";

const communitySchema = new Schema({});

const Community = models.Community || model("Community", communitySchema);

export default Community;