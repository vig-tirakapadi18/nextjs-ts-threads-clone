import UserCard from "@/components/shared/UserCard";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import React from "react";

const Search = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo.onboarded) return null;

  const users = await fetchUsers({
    userId: userInfo.id,
    searchTerm: "",
    pageNum: 1,
    pageSize: 15,
  });

  return (
    <section>
      <h1 className="head-text mt-10">Search</h1>

      <div className="mt-14 flex flex-col gap-9">
        {users?.users.length === 0 ? (
          <p className="no-result">No users found!</p>
        ) : (
          <>
            {users?.users.map((user) => (
              <UserCard
                key={user.id}
                id={user.id}
                name={user.name}
                username={user.username}
                imgUrl={user.image}
                personType="User"
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default Search;
