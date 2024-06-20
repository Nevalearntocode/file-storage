"use client";

import React, { use } from "react";
import { Doc } from "../../convex/_generated/dataModel";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CardAction from "./card-action";
import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import Loading from "../app/loading";
import { format } from "date-fns";

type Props = {
  file: Doc<"files">;
};

const typeIcons = {
  image: "🖼️",
  pdf: "📄",
  csv: "📊",
  svg: "🗺️",
};

const FileCard = ({ file }: Props) => {
  const fileUrl = useQuery(api.utils.generateImageUrl, {
    fileId: file.fileId,
  });

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader className="relative">
        <CardTitle className="flex items-center gap-2">
          <div className="flex justify-center">{typeIcons[file.type]}</div>
          {file.name}
        </CardTitle>
        <div className="absolute right-2 top-2">
          <CardAction fileId={file._id} orgId={file.orgId} />
        </div>
      </CardHeader>
      <CardContent className="h-full items-center">
        <div className="relative flex h-full min-h-[200px]">
          {file.type === "image" && (
            <>
              {!fileUrl ? (
                <div className="flex w-full items-center justify-center">
                  <Loading />
                </div>
              ) : (
                <Image
                  priority
                  alt={file.name}
                  fill
                  sizes="(100vw - 2rem) 200px"
                  src={fileUrl ? fileUrl : "/blank.svg"}
                  className="aspect-auto rounded-xl border-2"
                />
              )}
            </>
          )}
          {file.type !== "image" && (
            <Image
              priority
              alt={file.name}
              width={200}
              height={200}
              className="aspect-square rounded-xl border-2"
              src={`/${file.type}-placeholder.jpg`}
            />
          )}
        </div>
      </CardContent>
      <CardFooter className="mt-auto flex items-center justify-between">
        <Button onClick={() => window.open(fileUrl ?? "", "_blank")}>
          Download
        </Button>
        <p className="text-xs italic">
          {format(file._creationTime, "dd/MM/yyyy")}
        </p>
      </CardFooter>
    </Card>
  );
};

export default FileCard;
