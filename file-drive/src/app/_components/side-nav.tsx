"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FileIcon, StarIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import React from "react";

type Props = {};

const SideNav = (props: Props) => {
  const pathname = usePathname();
  return (
    <>
      <Button
        variant="link"
        className={cn(
          "flex items-center justify-start gap-2",
          pathname === "/" &&
            "border-y-2 border-l-2 bg-muted-foreground font-bold text-white",
        )}
        asChild
      >
        <Link href={`/`}>
          <FileIcon className="mr-2 h-5 w-5" />
          All Files
        </Link>
      </Button>
      <Button
        variant="link"
        className={cn(
          "flex items-center justify-start gap-2",
          pathname === "/favorites" &&
            "border-y-2 border-l-2 bg-muted-foreground font-bold text-white",
        )}
        asChild
      >
        <Link href={`/favorites`}>
          <StarIcon className="mr-2 h-5 w-5" />
          Favorites
        </Link>
      </Button>
    </>
  );
};

export default SideNav;
