import AccountProfile, { IUser } from "@/components/forms/AccountProfile";
import { currentUser } from "@clerk/nextjs";
import React from "react";

const Onboarding = async () => {
  const user = await currentUser();

  const userInfo = {
    id: "someid",
    username: "somename",
    name: "somename",
    bio: "somebio",
    image: "someimage",
  };

  const userData = {
    id: user?.id,
    objectId: userInfo.id,
    username: userInfo?.username || user?.username,
    name: (userInfo?.name || user?.firstName) ?? "",
    bio: userInfo?.bio || "",
    image: userInfo?.image || user?.imageUrl,
  };

  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <h1 className="head-text">Onboarding</h1>
      <p className="mt-3 text-base-regular text-light-2">
        Complete your profile to use Threads
      </p>

      <section className="mt-9 bg-dark-2 p-10">
        <AccountProfile user={userData as IUser} btnTitle="Continue" />
      </section>
    </main>
  );
};

export default Onboarding;
