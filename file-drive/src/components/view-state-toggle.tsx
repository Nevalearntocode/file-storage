"use client";

import { ViewState } from "@/hooks/use-view-state";
import { Button } from "./ui/button";
import { ImageIcon, TableIcon } from "lucide-react";

type Props = {
  handleCardViewClick: () => void;
  handleDatatableViewClick: () => void;
  viewState: ViewState;
};

const ViewStateToggle = ({
  handleCardViewClick,
  handleDatatableViewClick,
  viewState,
}: Props) => {
  return (
    <>
      {viewState === "card" ? (
        <Button
          className=""
          onClick={() => {
            handleDatatableViewClick();
          }}
          variant={`outline`}
          size={`icon`}
        >
          <ImageIcon className="h-5 w-5" />
        </Button>
      ) : (
        <Button
          className=""
          onClick={() => {
            handleCardViewClick();
          }}
          variant={`outline`}
          size={`icon`}
        >
          <TableIcon className="h-5 w-5" />
        </Button>
      )}
    </>
  );
};

export default ViewStateToggle;
