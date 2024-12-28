import { formatDateString } from "@/lib/utils";
import { IThreadCardProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiSolidMessageRoundedDetail } from "react-icons/bi";
import { FaHeart, FaReplyAll, FaShareSquare } from "react-icons/fa";

const ThreadCard = ({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
}: IThreadCardProps) => {
  return (
    <article
      className={`flex w-full flex-col rounded-xl ${
        isComment ? "px-0 xs:px-7" : "bg-dark-2 p-7"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              <Image
                src={author.image}
                alt="profile pic"
                fill
                className="cursor-pointer rounded-full"
              />
            </Link>

            <div className="thread-card_bar" />
          </div>

          <div className="">
            <Link href={`/profile/${author.id}`} className="w-fit">
              <h4 className="cursor-pointer text-base-semibold text-light-1">
                {author.name}
              </h4>
            </Link>

            <p className="mt-2 text-small-regular text-light-2">{content}</p>

            <div className={`${isComment && "mt-10"} mt-5 flex flex-col gap-3`}>
              <div className="flex gap-5">
                <FaHeart size={24} color="gray" />
                <Link href={`/thread/${id}`}>
                  <BiSolidMessageRoundedDetail size={24} color="gray" />
                </Link>
                <FaReplyAll size={24} color="gray" />
                <FaShareSquare size={24} color="gray" />
              </div>

              {isComment && comments.length > 0 && (
                <p className="mt-1 text-subtle-medium text-gray-1">
                  {comments.length} replies
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      {!isComment && community && (
        <Link
          href={`/communities/${community.id}`}
          className="mt-5 flex items-center"
        >
          <p className="text-subtle-medium text-gray-1">
            {formatDateString(createdAt)} - {community.name} Community
          </p>

          <Image
            src={community.image}
            alt="Community DP"
            width={14}
            height={14}
            className="ml-1 rounded-full object-cover"
          />
        </Link>
      )}

      <h2 className="text-small-regular text-light-2 mt-2">{content}</h2>
    </article>
  );
};

export default ThreadCard;
