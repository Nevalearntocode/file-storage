import React from "react";
import { Button } from "./ui/button";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { DownloadIcon } from "lucide-react";

type Props = {
  fileId: Id<"_storage">;
  state: "card" | "table";
};

const DownloadButton = ({ fileId, state }: Props) => {
  const fileUrl = useQuery(api.utils.generateImageUrl, {
    fileId: fileId,
  });

  return (
    <Button
      onClick={() => window.open(fileUrl ?? "", "_blank")}
      variant={state === "card" ? "default" : "ghost"}
      size={state === "card" ? "default" : "icon"}
    >
        {state === "table" && <DownloadIcon className="h-5 w-5" />}
        {state === "card" && "Download"}
    </Button>
  );
};

export default DownloadButton;
