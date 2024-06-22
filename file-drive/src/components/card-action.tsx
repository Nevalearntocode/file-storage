"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Star, Trash } from "lucide-react";
import { useAlertModal } from "@/hooks/use-alert-modal";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { Protect } from "@clerk/nextjs";
import { userPrefix } from "../../convex/utils";
import { usePathname } from "next/navigation";

type Props = {
  fileId: Id<"files">;
  orgId: string;
};

const CardAction = ({ fileId, orgId }: Props) => {
  const toggleArchiveFile = useMutation(api.files.toggleArchiveFile);
  const toggleFavorite = useMutation(api.files.toggleFavorite);
  const isFavorite = useQuery(api.files.isFavorite, {
    fileId,
    orgId,
  });
  const pathname = usePathname();
  const { onOpen } = useAlertModal();
  const message =
    pathname === "/archived"
      ? "Are you sure you want to restore this file?"
      : "Are you sure you want to archive this file? Archived files will be deleted permanently after 24 hours.";
  const onConfirm = async () => {
    await toggleArchiveFile({ fileId, orgId });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontal className="h-5 w-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {pathname !== "/archived" && (
          <DropdownMenuItem
            className="cursor-pointer text-yellow-500 focus:text-yellow-600"
            onClick={() => toggleFavorite({ fileId, orgId })}
          >
            {isFavorite ? (
              <Star
                className="mr-2 h-5 w-5 text-yellow-500"
                fill="currentColor"
              />
            ) : (
              <Star className="mr-2 h-5 w-5" />
            )}
            Favorite
          </DropdownMenuItem>
        )}
        <Protect role="org:admin" fallback={<></>}>
          {pathname !== "/archived" && <DropdownMenuSeparator />}
          <DropdownMenuItem
            className="cursor-pointer text-rose-500 focus:text-rose-600"
            onClick={() => onOpen({ onConfirm, message })}
          >
            <Trash className="mr-2 h-5 w-5" />
            {pathname === "/archived" ? "Restore" : "Archive"}
          </DropdownMenuItem>
        </Protect>
        {orgId.startsWith(userPrefix) && (
          <>
            {pathname !== "/archived" && <DropdownMenuSeparator />}
            <DropdownMenuItem
              className="cursor-pointer text-rose-500 focus:text-rose-600"
              onClick={() => onOpen({ onConfirm, message })}
            >
              <Trash className="mr-2 h-5 w-5" />
              {pathname === "/archived" ? "Restore" : "Archive"}
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CardAction;
