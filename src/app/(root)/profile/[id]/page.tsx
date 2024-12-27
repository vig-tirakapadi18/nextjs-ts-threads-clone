"use server";

import ProfileHeader from "@/components/shared/ProfileHeader";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import ThreadsTab from "@/components/shared/ThreadsTab";

interface IProfileProps {
  params: { id: string };
}

const Profile = async ({ params }: IProfileProps) => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(params.id);

  if (!userInfo) return null;

  if (!userInfo.onboarded) redirect("/onboarding");

  return (
    <section>
      <ProfileHeader
        accounId={userInfo.id}
        authUserId={user.id}
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.image}
        bio={userInfo.bio}
      />

      <div className="mt-9">
        <Tabs defaultValue="threads" className="w-full">
          <TabsList className="tab">
            {profileTabs.map((tab) => (
              <TabsTrigger key={tab.label} value="tab.value">
                {tab.icon(16)}
                <p className="max-sm:hidden">{tab.label}</p>
                {tab.label === "Threads" && (
                  <p className="ml-1 rounded-full bg-light-4 px-2 py-1 text-tiny-medium text-light-2"></p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {profileTabs.map((tab) => (
            <TabsContent
              key={`content-${tab.label}`}
              value={tab.value}
              className="w-full text-light-1"
            >
              <ThreadsTab
                currentUserId={user.id}
                accountId={userInfo.id}
                accountType={"User"}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default Profile;
