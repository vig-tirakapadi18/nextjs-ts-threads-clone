"use server";

import { IUser } from "@/types";
import { connectToDB } from "../connectToDB";
import User from "../models/user.model";
import { revalidatePath } from "next/cache";
import Community from "../models/community.model";
import Thread from "../models/thread.model";
import { FilterQuery, SortOrder } from "mongoose";

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

export const fetchUser = async (userId: string) => {
  connectToDB();

  try {
    return await User.findOne({ id: userId }).populate({
      path: "communities",
      model: Community,
    });
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}!`);
  }
};

export const fetchUserPost = async (userId: string) => {
  connectToDB();

  try {
    const threads = await User.findOne({ id: userId }).populate({
      path: "threads",
      model: Thread,
      populate: {
        path: "children",
        model: Thread,
        populate: {
          path: "author",
          model: User,
          select: "name image id",
        },
      },
    });

    return threads;
  } catch (error: unknown) {
    if (error instanceof Error)
      throw new Error(`Error fetching user posts: ${error.message}`);
  }
};

export const fetchUsers = async ({
  userId,
  searchTerm = "",
  pageNum = 1,
  pageSize = 10,
  sortBy = "desc",
}: {
  userId: string;
  searchTerm: string;
  pageNum: number;
  pageSize: number;
  sortBy?: SortOrder;
}) => {
  try {
    connectToDB();

    const skip = (pageNum - 1) * pageSize;

    const regex = new RegExp(searchTerm, "i");

    const query: FilterQuery<typeof User> = { id: { $ne: userId } };

    if (searchTerm.trim() !== "") {
      query.$or = [
        { username: { $regex: regex } },
        { name: { $regex: regex } },
      ];
    }

    const sortOptions = { createdAt: sortBy };

    const usersQuery = User.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize);

    const totalUsersCount = await User.countDocuments(query);

    const users = await usersQuery.exec();

    const isNext = totalUsersCount > skip + users.length;

    return { users, isNext };
  } catch (error: unknown) {
    if (error instanceof Error)
      throw new Error(`Failed to fetch users: ${error.message}!`);
  }
};
