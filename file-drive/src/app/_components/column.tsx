"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Doc } from "../../../convex/_generated/dataModel";
import { format } from "date-fns";
import UserDisplay from "@/components/user-display";
import CardAction from "@/components/card-action";
import DownloadButton from "@/components/download-button";

// This type is used to define the shape of our data.b
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Doc<"files">>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    header: "Uploaded by",
    cell: ({ row }) => {
      return <UserDisplay userId={row.original.userId} state="table" />;
    },
  },
  {
    header: "Uploaded at",
    cell: ({ row }) => {
      return <div>{format(row.original._creationTime, "dd/MM/yyyy")}</div>;
    },
  },
  {
    header: "Download",
    cell: ({ row }) => {
      return <DownloadButton fileId={row.original.fileId} state="table" />;
    },
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      return (
        <CardAction fileId={row.original._id} orgId={row.original.orgId} />
      );
    },
  },
];
