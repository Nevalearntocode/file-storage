"use client";

import { useQuery } from "convex/react";
import React from "react";
import { api } from "../../../convex/_generated/api";
import { useOrganizationContext } from "@/contexts/organization-context";
import FileCard from "./file-card";
import EmptyState from "../empty-state";
import Loading from "../loading";
import { useSearchParams } from "next/navigation";
import { Doc } from "../../../convex/_generated/dataModel";

type Props = {};

const FileList = (props: Props) => {
  const organization = useOrganizationContext();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");
  const nameSort = searchParams.get("name");
  const sizeSort = searchParams.get("size");
  const dateSort = searchParams.get("date");
  const fileType = searchParams.get("type");

  console.log(nameSort, sizeSort, dateSort, fileType);

  const files = useQuery(
    api.files.getFiles,
    organization
      ? {
          orgId: organization.orgId,
          searchQuery: searchQuery ?? undefined,
          fileType: (fileType as Doc<"files">["type"]) ?? undefined,
          nameSort: nameSort as "asc" | "desc" ?? undefined,
          sizeSort: sizeSort as "asc" | "desc" ?? undefined,
          dateSort: dateSort as "asc" | "desc" ?? undefined,
        }
      : "skip",
  );

  if (!files) {
    return <Loading />;
  }

  if (files.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {files.map((file) => (
        <FileCard key={file._id} file={file} />
      ))}
    </div>
  );
};

export default FileList;
