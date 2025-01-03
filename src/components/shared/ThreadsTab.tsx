import { fetchUserPost } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import React from "react";
import ThreadCard from "../cards/ThreadCard";
import { fetchCommunityPosts } from "@/lib/actions/community.actions";

interface IThreadsTabProps {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

const ThreadsTab = async ({
  currentUserId,
  accountId,
  accountType,
}: IThreadsTabProps) => {
  let threads: any;

  if (accountType === "Community") {
    threads = await fetchCommunityPosts(accountId);
  } else {
    threads = await fetchUserPost(accountId);
  }

  if (!threads) redirect("/");

  return (
    <section className="mt-9 flex flex-col gap-10">
      {threads.threads.map((thread: any) => (
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUserId={currentUserId}
          parentId={thread.parentId}
          content={thread.text}
          author={
            accountType === "User"
              ? { name: threads.name, image: threads.image, id: threads.id }
              : {
                  name: threads.author.name,
                  image: threads.author.image,
                  id: threads.author.id,
                }
          }
          community={thread.community}
          createdAt={thread.createdAt}
          comments={thread.children}
        />
      ))}
    </section>
  );
};

export default ThreadsTab;
