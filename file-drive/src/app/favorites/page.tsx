import React from "react";
import RouteHeader from "@/components/route-header";
import FileList from "@/components/file-list";

type Props = {};

const Favorites = (props: Props) => {
  return (
    <div className="flex w-full flex-col gap-12">
      <RouteHeader label="Favorites" />
      <FileList isFavorite={true} />
    </div>
  );
};

export default Favorites;
