"use client";

import { useQuery } from "convex/react";
import React, { useEffect } from "react";
import { api } from "../../convex/_generated/api";
import { useOrganizationContext } from "@/contexts/organization-context";
import FileCard from "./file-card";
import EmptyState from "../app/empty-state";
import Loading from "../app/loading";
import { useSearchParams } from "next/navigation";
import useViewState, { ViewState } from "@/hooks/use-view-state";
import { DataTable } from "@/app/_components/datatable";
import { columns } from "@/app/_components/column";

type Props = {
  route: "favorites" | "all" | "archived";
  viewState: ViewState;
};

const FileList = ({ route = "all", viewState }: Props) => {
  const organization = useOrganizationContext();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");
  const nameSort = searchParams.get("name");
  const sizeSort = searchParams.get("size");
  const dateSort = searchParams.get("date");
  const fileType = searchParams.get("type");

  const files = useQuery(
    api.files.getFiles,
    organization
      ? {
          orgId: organization.orgId,
          searchQuery: searchQuery ?? undefined,
          route,
        }
      : "skip",
  );

  if (!files) {
    return <Loading />;
  }

  let data = files;

  if (fileType) {
    data = data.filter((file) => file.type === fileType);
  }

  if (nameSort) {
    data = data.sort((a, b) => {
      if (nameSort === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
  }

  if (sizeSort) {
    data = data.sort((a, b) => {
      if (sizeSort === "asc") {
        return a.size - b.size;
      } else {
        return b.size - a.size;
      }
    });
  }

  if (dateSort) {
    data = data.sort((a, b) => {
      if (dateSort === "asc") {
        return a._creationTime - b._creationTime;
      } else {
        return b._creationTime - a._creationTime;
      }
    });
  }

  if (data.length === 0) {
    return <EmptyState />;
  }

  return (
    <>
      {viewState === "card" && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {data.map((file) => (
            <FileCard key={file._id} file={file} />
          ))}
        </div>
      )}
      {viewState === "table" && <DataTable columns={columns} data={data} />}
    </>
  );
};

export default FileList;
