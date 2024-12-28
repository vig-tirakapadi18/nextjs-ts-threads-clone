import CommunityCard from "@/components/cards/CommunityCard";
import { fetchCommunities } from "@/lib/actions/community.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import React from "react";

const Communities = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo.onboarded) return null;

  const communities = await fetchCommunities({
    searchTerm: "",
    pageNum: 1,
    pageSize: 15,
  });

  return (
    <section>
      <h1 className="head-text mt-10">Communities</h1>

      <div className="mt-14 flex flex-col gap-9">
        {communities?.communities.length === 0 ? (
          <p className="no-result">No users found!</p>
        ) : (
          <>
            {communities?.communities.map((community) => (
              <CommunityCard
                key={community.id}
                id={community.id}
                name={community.name}
                username={community.username}
                imgUrl={community.image}
                bio={community.bio}
                members={community.members}
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default Communities;
