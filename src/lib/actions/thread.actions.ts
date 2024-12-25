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
