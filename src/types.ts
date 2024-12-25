import { ObjectId } from "mongoose";

export interface IUser {
  id?: string;
  userId?: string;
  username: string;
  name: string;
  image: string;
  bio: string;
  threads: ObjectId[];
  onboarded: boolean;
  communities: ObjectId[];
  path?: string;
}
