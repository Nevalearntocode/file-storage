import RouteHeader from "@/components/route-header";
import FileList from "../components/file-list";

export default function Home() {
  return (
    <main className="flex w-full flex-col gap-12">
      <RouteHeader label="Your files" />
      <FileList />
    </main>
  );
}
