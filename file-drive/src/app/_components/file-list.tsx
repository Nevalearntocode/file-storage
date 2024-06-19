"use client";

import { useQuery } from "convex/react";
import React from "react";
import { api } from "../../../convex/_generated/api";
import { useOrganizationContext } from "@/contexts/organization-context";
import FileCard from "./file-card";
import EmptyState from "../empty-state";
import Loading from "../loading";
import { useSearchParams } from "next/navigation";

type Props = {};

const FileList = (props: Props) => {
  const organization = useOrganizationContext();
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('search')
  const files = useQuery(
    api.files.getFiles,
    organization ? { orgId: organization.orgId, query: searchQuery ?? undefined } : "skip",
  );

  if(!files){
    return <Loading />
  }

  if (files.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {files.map((file) => (
        <FileCard key={file._id} file={file} />
      ))}
    </div>
  );
};

export default FileList;
