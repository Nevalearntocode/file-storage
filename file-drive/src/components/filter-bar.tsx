"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDown, ArrowUp, Check, Filter, FilterX } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

type Props = {};

const FilterBar = (props: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter()
  const nameSort = searchParams.get("name");
  const sizeSort = searchParams.get("size");
  const dateSort = searchParams.get("date");
  const fileType = searchParams.get("type");

  const [nameAscending, setNameAscending] = useState<boolean | null>(
    nameSort ? (nameSort === "asc" ? true : false) : null,
  );
  const [sizeAscending, setSizeAscending] = useState<boolean | null>(
    sizeSort ? (sizeSort === "asc" ? true : false) : null,
  );
  const [dateAscending, setDateAscending] = useState<boolean | null>(
    dateSort ? (dateSort === "asc" ? true : false) : null,
  );
  const [currentType, setCurrentType] = useState<string | null>(fileType);

  const handleSortByName = () => {
    const url = new URL(window.location.href);
    if (nameAscending) {
      setNameAscending(false);
      url.searchParams.set("name", "desc");
    } else {
      setNameAscending(true);
      url.searchParams.set("name", "asc");
    }
    window.history.replaceState({}, "", url.toString());
  };

  const handleSortBySize = () => {
    const url = new URL(window.location.href);
    if (sizeAscending) {
      setSizeAscending(false);
      url.searchParams.set("size", "desc");
    } else {
      setSizeAscending(true);
      url.searchParams.set("size", "asc");
    }
    window.history.replaceState({}, "", url.toString());
  };

  const handleSortByDate = () => {
    const url = new URL(window.location.href);
    if (dateAscending) {
      setDateAscending(false);
      url.searchParams.set("date", "desc");
    } else {
      setDateAscending(true);
      url.searchParams.set("date", "asc");
    }
    window.history.replaceState({}, "", url.toString());
  };

  const handleFileTypeFilter = (type: string) => {
    const url = new URL(window.location.href);
    url.searchParams.delete("type");
    if (currentType === type) {
      setCurrentType(null);
    } else {
      url.searchParams.set("type", type);
      setCurrentType(type);
    }
    window.history.replaceState({}, "", url.toString());
  };

  const handleRemoveSort = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("size");
    url.searchParams.delete("date");
    url.searchParams.delete("name");
    url.searchParams.delete("type");
    url.searchParams.delete("search");
    setSizeAscending(null);
    setDateAscending(null);
    setNameAscending(null);
    setCurrentType(null);
    window.history.replaceState({}, "", url.toString());
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="absolute right-0 focus-visible:ring-offset-0"
        >
          <Filter className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="flex cursor-pointer justify-between"
          onClick={handleSortByName}
        >
          A to Z
          {nameAscending === true && <ArrowDown className="ml-2 h-4 w-4" />}
          {nameAscending === false && <ArrowUp className="ml-2 h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex cursor-pointer justify-between"
          onClick={handleSortBySize}
        >
          Size
          {sizeAscending === true && <ArrowDown className="ml-2 h-4 w-4" />}
          {sizeAscending === false && <ArrowUp className="ml-2 h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex cursor-pointer justify-between"
          onClick={handleSortByDate}
        >
          Date
          {dateAscending === true && <ArrowDown className="ml-2 h-4 w-4" />}
          {dateAscending === false && <ArrowUp className="ml-2 h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-2" />
        <DropdownMenuItem
          className="flex items-center justify-between"
          onClick={() => handleFileTypeFilter("image")}
        >
          Image
          {currentType === "image" && <Check className="ml-2 h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center justify-between"
          onClick={() => handleFileTypeFilter("pdf")}
        >
          PDF
          {currentType === "pdf" && <Check className="ml-2 h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center justify-between"
          onClick={() => handleFileTypeFilter("csv")}
        >
          CSV
          {currentType === "csv" && <Check className="ml-2 h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center justify-between"
          onClick={() => handleFileTypeFilter("svg")}
        >
          SVG
          {currentType === "svg" && <Check className="ml-2 h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={handleRemoveSort}>
          Remove filter
          <FilterX className="ml-2 h-4 w-4 opacity-80" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterBar;
