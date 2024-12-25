"use server";

import { IUser } from "@/types";
import { connectToDB } from "../connectToDB";
import User from "../models/user.model";
import { revalidatePath } from "next/cache";

export const updateUser = async (userData: Partial<IUser>): Promise<void> => {
  connectToDB();

  const { userId, name, username, bio, image, path } = userData;

  try {
    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username?.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
      },
      { upsert: true }
    );

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to update user: ${error.message}!`);
  }
};
