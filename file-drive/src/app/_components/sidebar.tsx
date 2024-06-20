import React from "react";
import SideNav from "./side-nav";

type Props = {};

const Sidebar = (props: Props) => {

  return (
    <div className="flex w-48 flex-col gap-4 border-r">
      <SideNav />
    </div>
  );
};

export default Sidebar;
