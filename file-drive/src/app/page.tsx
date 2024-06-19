import FileList from "./_components/file-list";
import SearchBar from "./_components/search-bar";
import UploadButton from "./_components/upload-button";

export default function Home() {

  return (
    <main className="container mx-auto pt-12 flex flex-col gap-12">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Your files</h1>
        <SearchBar />
        <UploadButton />
      </div>
        <FileList />
    </main>
  );
}
