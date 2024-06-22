"use client";

import RouteHeader from "@/components/route-header";
import FileList from "../components/file-list";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const route = searchParams.get("route");

  const currentRoute: {
    name: string;
    value: "all" | "favorites" | "archived";
  } = !route
    ? {
        name: "All Files",
        value: "all",
      }
    : route === "favorites"
      ? {
          name: "Favorites",
          value: "favorites",
        }
      : {
          name: "Archived",
          value: "archived",
        };

  return (
    <main className="flex w-full flex-col gap-12">
      <RouteHeader label={currentRoute.name} />
      <FileList route={currentRoute.value} />
    </main>
  );
}
