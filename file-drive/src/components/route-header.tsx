"use client";

import FilterBar from "@/components/filter-bar";
import SearchBar from "@/components/search-bar";
import UploadButton from "@/components/upload-button";
import ViewStateToggle from "./view-state-toggle";
import { ViewState } from "@/hooks/use-view-state";

type Props = {
  label: string;
  handleCardViewClick: () => void;
  handleDatatableViewClick: () => void;
  viewState: ViewState;
};

const RouteHeader = ({
  label,
  viewState,
  handleCardViewClick,
  handleDatatableViewClick,
}: Props) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-4xl font-bold">{label}</h1>
      <div className="flex items-center gap-4">
        <div className="relative flex items-center gap-4">
          <SearchBar />
          <FilterBar />
        </div>
        <ViewStateToggle
          viewState={viewState}
          handleCardViewClick={handleCardViewClick}
          handleDatatableViewClick={handleDatatableViewClick}
        />
      </div>
      <UploadButton />
    </div>
  );
};

export default RouteHeader;
