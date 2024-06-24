"use client";

import React from "react";
import UserAvatar from "./user-avatar";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { cn } from "@/lib/utils";

type Props = {
  userId: Id<"users">;
  children?: React.ReactNode;
  state: "card" | "table";
};

const UserDisplay = ({ userId, children, state }: Props) => {
  const user = useQuery(api.users.getFileUser, { userId });

  return (
    <div className="flex items-center gap-2">
      {state === "card" && <UserAvatar image={user?.image ?? ""} />}
      <div className={cn("", state === "card" && "text-sm italic")}>
        <p>
          {state === "card" ? "by" : ""} {user?.name}
        </p>
        {children}
      </div>
    </div>
  );
};

export default UserDisplay;
