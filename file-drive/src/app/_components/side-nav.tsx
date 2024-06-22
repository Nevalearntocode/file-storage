"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FileIcon, StarIcon, Trash } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import React from "react";

type Props = {};

const SideNav = (props: Props) => {
  const searchParams = useSearchParams();
  const route = searchParams.get("route");

  const routes = [
    {
      name: "All Files",
      icon: FileIcon,
      route: "",
      isActive: route === "" || route === null,
    },
    {
      name: "Favorites",
      icon: StarIcon,
      route: "favorites",
      isActive: route === "favorites",
    },
    {
      name: "Archived",
      icon: Trash,
      route: "archived",
      isActive: route === "archived",
    },
  ];

  const onClick = (route: string) => {
    const url = new URL(window.location.href);
    if (route === "") {
      url.searchParams.delete("route");
    } else {
      url.searchParams.set("route", route);
    }
    window.history.replaceState({}, "", url.toString());
  };

  return (
    <>
      {routes.map((route) => (
        <Button
          key={route.name}
          variant="link"
          className={cn(
            "flex items-center justify-start gap-2",
            route.isActive &&
              "border-y-2 border-l-2 bg-muted-foreground font-bold text-white",
          )}
          onClick={() => onClick(route.route)}
        >
          <route.icon className="mr-2 h-5 w-5" />
          {route.name}
        </Button>
      ))}
    </>
  );
};

export default SideNav;
