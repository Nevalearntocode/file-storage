"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Trash } from "lucide-react";
import { useAlertModal } from "@/hooks/use-alert-modal";

type Props = {};

const CardAction = (props: Props) => {
  const { onOpen } = useAlertModal();
  const message = "Are you sure you want to delete this file?";
  const onConfirm = () => {
    console.log("delete");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontal className="h-5 w-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
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
