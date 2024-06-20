import React from "react";
import RouteHeader from "@/components/route-header";

type Props = {};

const Favorites = (props: Props) => {
  return (
    <div className="flex w-full flex-col gap-12">
      <RouteHeader label="Favorites" />
    </div>
  );
};

export default Favorites;
