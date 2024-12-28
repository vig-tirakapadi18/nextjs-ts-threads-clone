"use server";

import React from "react";
import { currentUser } from "@clerk/nextjs";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ThreadsTab from "@/components/shared/ThreadsTab";
import { communityTabs } from "@/constants";
import { fetchCommunityDetails } from "@/lib/actions/community.actions";
import UserCard from "@/components/shared/UserCard";

interface IProfileProps {
  params: { id: string };
}

const CommunityProfile = async ({ params }: IProfileProps) => {
  const user = await currentUser();
  if (!user) return null;

  const communityDetails = await fetchCommunityDetails(params.id);

  return (
    <section>
      <ProfileHeader
        accounId={communityDetails.id}
        authUserId={user.id}
        name={communityDetails.name}
        username={communityDetails.username}
        imgUrl={communityDetails.image}
        bio={communityDetails.bio}
        type="Community"
      />

      <div className="mt-9">
        <Tabs defaultValue="threads" className="w-full">
          <TabsList className="tab">
            {communityTabs.map((tab) => (
              <TabsTrigger key={tab.label} value="tab.value">
                {tab.icon(16)}
                <p className="max-sm:hidden">{tab.label}</p>
                {tab.label === "Threads" && (
                  <p className="ml-1 rounded-full bg-light-4 px-2 py-1 text-tiny-medium text-light-2">
                    {communityDetails?.threads?.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="threads" className="w-full text-light-1">
            <ThreadsTab
              currentUserId={user.id}
              accountId={communityDetails._id}
              accountType="Community"
            />
          </TabsContent>

          <TabsContent value="members" className="w-full text-light-1">
            <section className="mt-9 flex flex-col gap-10">
              {communityDetails?.members.map((member: any) => (
                <UserCard
                  key={member.id}
                  id={member.id}
                  name={member.name}
                  username={member.username}
                  imgUrl={member.image}
                  personType="User"
                />
              ))}
            </section>
          </TabsContent>

          <TabsContent value="threads" className="w-full text-light-1">
            <ThreadsTab
              currentUserId={user.id}
              accountId={communityDetails._id}
              accountType="Community"
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
export default CommunityProfile;
