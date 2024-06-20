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

type Props = {
  fileId: Id<"files">;
  orgId: string;
};

const CardAction = ({ fileId, orgId }: Props) => {
  const deleteFile = useMutation(api.files.deleteFile);
  const toggleFavorite = useMutation(api.files.toggleFavorite);
  const isFavorite = useQuery(api.files.isFavorite, {
    fileId,
    orgId,
  });
  const { onOpen } = useAlertModal();
  const message = "Are you sure you want to delete this file?";
  const onConfirm = async () => {
    await deleteFile({ fileId, orgId });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontal className="h-5 w-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
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
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer text-rose-500 focus:text-rose-600"
          onClick={() => onOpen({ onConfirm, message })}
        >
          <Trash className="mr-2 h-5 w-5" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CardAction;
