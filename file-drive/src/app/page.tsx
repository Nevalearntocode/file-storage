"use client";

import RouteHeader from "@/components/route-header";
import FileList from "../components/file-list";
import { useRouter, useSearchParams } from "next/navigation";
import useViewState from "@/hooks/use-view-state";
import Sidebar from "./_components/sidebar";
import { useSession } from "@clerk/nextjs";

export default function Home() {
  const searchParams = useSearchParams();
  const route = searchParams.get("route");
  const { viewState, handleCardViewClick, handleDatatableViewClick } =
    useViewState("filesView");

  const router = useRouter();

  const session = useSession();

  if (!session.isSignedIn && session.isLoaded) {
    router.push("/landing");
  }

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
    <main className="container mx-auto flex gap-8 pt-12">
      <Sidebar />
      <div className="flex w-full flex-col gap-12">
        <RouteHeader
          label={currentRoute.name}
          viewState={viewState}
          handleCardViewClick={handleCardViewClick}
          handleDatatableViewClick={handleDatatableViewClick}
        />
        <FileList route={currentRoute.value} viewState={viewState} />
      </div>
    </main>
  );
}
