import React from "react";

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
  return <div>ThreadsTab</div>;
};

export default ThreadsTab;
