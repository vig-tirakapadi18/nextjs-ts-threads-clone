"use server";

import { revalidatePath } from "next/cache";
import { connectToDB } from "../connectToDB";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import Community from "../models/community.model";

interface IThreadParams {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}

interface ICommentParams {
  threadId: string;
  comment: string;
  userId: string;
  path: string;
}

export const createThread = async ({
  text,
  author,
  communityId,
  path,
}: IThreadParams) => {
  connectToDB();

  try {
    const communityIdObj = await Community.findOne(
      { id: communityId },
      { _id: 1 }
    );

    const createThread = await Thread.create({
      text,
      author,
      community: communityIdObj,
    });

    await User.findByIdAndUpdate(author, {
      $push: { threads: createThread._id },
    });

    if (communityIdObj) {
      await Community.findByIdAndUpdate(communityIdObj, {
        $push: { threads: createThread._id },
      });
    }

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create thread: ${error.message}!`);
  }
};

export const fetchPosts = async (pageNum = 1, pageSize = 20) => {
  connectToDB();

  const skip = (pageNum - 1) * pageSize;

  // Top level threads - posts that have no children
  const postsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
    .sort({ createdAt: "desc" })
    .limit(pageSize)
    .populate({ path: "author", model: User })
    .populate({
      path: "children",
      populate: {
        path: "author",
        model: User,
        select: "_id name parentId image",
      },
    });

  const totalPostCount = await Thread.countDocuments({
    parentId: { $in: [null, undefined] },
  });

  const posts = await postsQuery.exec();

  const isNext = totalPostCount > skip + posts.length;

  return { posts, isNext };
};

export const fetchThreadById = async (id: string) => {
  connectToDB();

  try {
    const thread = await Thread.findById(id)
      .populate({
        path: "author",
        model: User,
        select: "_id id name image",
      })
      .populate({
        path: "children",
        populate: [
          { path: "author", model: User, select: "_id id parentId image" },
          {
            path: "children",
            model: Thread,
            populate: {
              path: "author",
              model: User,
              select: "_id id parentId image",
            },
          },
        ],
      })
      .exec();

    return thread;
  } catch (error: any) {
    throw new Error(`Error fetching thread by id: ${error.message}`);
  }
};

export const addCommentToThread = async (commentData: ICommentParams) => {
  connectToDB();

  try {
    const thread = await Thread.findById(commentData.threadId);

    if (thread) throw new Error("Thread not found!");

    const commentThread = new Thread({
      text: commentData.comment,
      author: commentData.userId,
      parentId: commentData.threadId,
    });

    const savedCommentThread = await commentThread.save();

    thread.children.push(savedCommentThread);

    await thread.save();
  } catch (error: unknown) {
    if (error instanceof Error)
      throw new Error(`Error adding comment to the thread: ${error.message}`);
  }
};
