import { FilterQuery, SortOrder } from "mongoose";
import { connectToDB } from "../connectToDB";
import Community from "../models/community.model";
import Thread from "../models/thread.model";
import User from "../models/user.model";

interface ICommunityData {
  id: string;
  name: string;
  username: string;
  image_url: string;
  logo_url: string;
  image: string;
  bio: string;
  createdById: string;
}

interface ISearchParams {
  searchTerm?: string;
  pageNum?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}

export const createCommunity = async (communityData: ICommunityData) => {
  connectToDB();

  try {
    const user = await User.findOne({ id: communityData.createdById });
    if (!user) throw new Error("User not found!");

    const newCommunity = new Community({
      id: communityData.id,
      name: communityData.name,
      username: communityData.username,
      image:
        communityData.logo_url ||
        communityData.image_url ||
        communityData.image,
      bio: communityData.bio,
      createdBy: user._id,
    });

    const createdCommunity = await newCommunity.save();

    user.communities.push(createdCommunity._id);
    await user.save();

    return createdCommunity;
  } catch (error: unknown) {
    if (error instanceof Error)
      throw new Error(`Failed to create community: ${error.message}!`);
  }
};

export const fetchCommunityDetails = async (id: string) => {
  connectToDB();

  try {
    const communityData = await Community.findOne({ id }).populate([
      "createdBy",
      {
        path: "members",
        model: User,
        select: "name username image _id id",
      },
    ]);

    return communityData;
  } catch (error: unknown) {
    if (error instanceof Error)
      throw new Error(`Failed to fetch community posts: ${error.message}!`);
  }
};

export const fetchCommunityPosts = async (id: string) => {
  connectToDB();

  try {
    const communityPosts = await Community.findById(id).populate({
      path: "threads",
      model: Thread,
      populate: [
        {
          path: "author",
          model: User,
          select: "name image id",
        },
        {
          path: "children",
          model: Thread,
          populate: {
            path: "author",
            model: User,
            select: "image, _id",
          },
        },
      ],
    });

    return communityPosts;
  } catch (error: unknown) {
    if (error instanceof Error)
      throw new Error(`Failed to fetch community posts: ${error.message}!`);
  }
};

export const fetchCommunities = async ({
  searchTerm = "",
  pageNum = 1,
  pageSize = 10,
  sortBy = "desc",
}: ISearchParams) => {
  connectToDB();

  const skip = (pageNum - 1) * pageSize;
  const regex = new RegExp(searchTerm, "i");
  const query: FilterQuery<typeof Community> = {};

  if (searchTerm.trim() !== "") {
    query.$or = [{ username: { $regex: regex } }, { name: { $regex: regex } }];
  }

  const sortOptions = { createdAt: sortBy };

  try {
    const communitiesQuery = Community.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize)
      .populate("members");

    const totalCommunitiesCount = await Community.countDocuments(query);

    const communities = await communitiesQuery.exec();

    const isNext = totalCommunitiesCount > skip + communities.length;

    return { communities, isNext };
  } catch (error: unknown) {
    if (error instanceof Error)
      throw new Error(`Failed to fetch communities: ${error.message}!`);
  }
};

export const addMemberToCommunity = async (
  communityId: string,
  userId: string
) => {
  connectToDB();

  try {
    const community = await Community.findOne({ id: communityId });

    if (!community) throw new Error("Community not found!");

    const user = await User.findOne({ id: userId });

    if (!user) throw new Error("User not found!");

    if (community.members.includes(user._id))
      throw new Error("User is already a member!");

    community.members.push(user._id);
    await community.save();

    return community;
  } catch (error: unknown) {
    if (error instanceof Error)
      throw new Error(`Failed to add member to community: ${error.message}!`);
  }
};

export const removeMemberFromCommunity = async (
  userId: string,
  communityId: string
) => {
  connectToDB();

  try {
    const userIdObj = await User.findOne({ id: userId }, { _id: 1 });
    const communityIdObj = await Community.findOne(
      { id: communityId },
      { _id: 1 }
    );

    if (!userIdObj) throw new Error("User not found!");
    if (!communityIdObj) throw new Error("Community not found!");

    await Community.updateOne(
      { _id: communityIdObj._id },
      { $pull: { members: userIdObj._id } }
    );

    await User.updateOne(
      { _id: userIdObj._id },
      { $pull: { communities: communityIdObj._id } }
    );

    return { success: true };
  } catch (error: unknown) {
    if (error instanceof Error)
      throw new Error(
        `Failed to remove member from community: ${error.message}!`
      );
  }
};

export async function updateCommunityInfo(
  communityId: string,
  name: string,
  username: string,
  image: string
) {
  try {
    connectToDB();

    const updatedCommunity = await Community.findOneAndUpdate(
      { id: communityId },
      { name, username, image }
    );

    if (!updatedCommunity) {
      throw new Error("Community not found");
    }

    return updatedCommunity;
  } catch (error) {
    console.error("Error updating community information:", error);
    throw error;
  }
}

export async function deleteCommunity(communityId: string) {
  try {
    connectToDB();

    const deletedCommunity = await Community.findOneAndDelete({
      id: communityId,
    });

    if (!deletedCommunity) {
      throw new Error("Community not found");
    }

    await Thread.deleteMany({ community: communityId });

    const communityUsers = await User.find({ communities: communityId });

    const updateUserPromises = communityUsers.map((user) => {
      user.communities.pull(communityId);
      return user.save();
    });

    await Promise.all(updateUserPromises);

    return deletedCommunity;
  } catch (error) {
    console.error("Error deleting community: ", error);
    throw error;
  }
}
