"use client";

import { useOrganization, useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "@/components/ui/button";

export default function Home() {
  const organization = useOrganization();
  const user = useUser();
  
  let orgId: string | undefined = undefined
  if(organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id
  }

  const createFile = useMutation(api.files.createFile);
  const getFiles = useQuery(
    api.files.getFiles,
    orgId ? { orgId } : "skip",
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-4">
      <Button
        onClick={() => {
          if (!orgId) return;
          createFile({ name: "New File", orgId });
        }}
      >
        Create File
      </Button>
      {getFiles && (
        <ul className="list-inside list-disc">
          {getFiles.map((file) => (
            <li key={file._id}>
              {file.name} - {file.orgId}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
