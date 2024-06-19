"use client";

import React, { use } from "react";
import { Doc } from "../../../convex/_generated/dataModel";
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
import { api } from "../../../convex/_generated/api";

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
  const imageUrl = useQuery(api.files.generateImageUrl, {
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
      <CardContent className="h-full">
        <div className="relative flex h-full">
          {file.type === "image" && (
            <Image
              alt={file.name}
              fill
              src={imageUrl ?? ""}
              className="aspect-auto rounded-xl border-2"
            />
          )}
          {file.type !== "image" && (
            <Image
              alt={file.name}
              width={200}
              height={200}
              className="aspect-square rounded-xl border-2"
              src={`/${file.type}-placeholder.jpg`}
            />
          )}
        </div>
      </CardContent>
      <CardFooter className="mt-auto flex">
        <Button>Download</Button>
      </CardFooter>
    </Card>
  );
};

export default FileCard;
