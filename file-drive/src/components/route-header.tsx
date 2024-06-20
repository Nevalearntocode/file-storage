import FilterBar from "@/components/filter-bar";
import SearchBar from "@/components/search-bar";
import UploadButton from "@/components/upload-button";
import React from "react";

type Props = {
  label: string;
};

const RouteHeader = ({ label }: Props) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-4xl font-bold">{label}</h1>
      <div className="relative flex items-center gap-4">
        <SearchBar />
        <FilterBar />
      </div>
      <UploadButton />
    </div>
  );
};

export default RouteHeader;
