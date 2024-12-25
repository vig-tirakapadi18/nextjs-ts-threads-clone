"use server";

import { revalidatePath } from "next/cache";
import { connectToDB } from "../connectToDB";
import Thread from "../models/thread.model";
import User from "../models/user.model";

interface IThreadParams {
  text: string;
  author: string;
  communityId: string | null;
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
    const createThread = await Thread.create({ text, author, community: null });

    await User.findByIdAndUpdate(author, {
      $push: { threads: createThread._id },
    });

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
