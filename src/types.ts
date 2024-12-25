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

// ThreadCard Component
export interface IAuthor {
  name: string;
  image: string;
  id: string;
}

export interface ICommunity {
  name: string;
  id: string;
  image: string;
}

export interface IComment {
  author: { image: string };
}

export interface IThreadCardProps {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: IAuthor;
  community: ICommunity | null;
  createdAt: string;
  comments: IComment[];
  isComment?: boolean;
}

