import FileList from "./_components/file-list";
import FilterBar from "./_components/filter-bar";
import SearchBar from "./_components/search-bar";
import UploadButton from "./_components/upload-button";

export default function Home() {
  return (
    <main className="container mx-auto flex flex-col gap-12 pt-12">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Your files</h1>
        <div className="flex items-center gap-4 relative">
          <SearchBar />
          <FilterBar />
        </div>
        <UploadButton />
      </div>
      <FileList />
    </main>
  );
}
