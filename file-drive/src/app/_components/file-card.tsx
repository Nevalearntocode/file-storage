"use client"

import React from "react";
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

type Props = {
  file: Doc<"files">;
};

const FileCard = ({ file }: Props) => {

  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle>{file.name}</CardTitle>
        <div className="absolute top-2 right-2">
          <CardAction />
        </div>
      </CardHeader>
      <CardContent>
        <p>Card content</p>
      </CardContent>
      <CardFooter>
        <Button>Download</Button>
      </CardFooter>
    </Card>
  );
};

export default FileCard;
