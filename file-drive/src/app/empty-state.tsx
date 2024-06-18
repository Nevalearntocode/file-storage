import Image from "next/image";
import React from "react";

type Props = {};

const EmptyState = (props: Props) => {
  return (
    <div className="my-12 flex flex-col items-center justify-center space-y-8">
      <Image src={`/blank.svg`} alt="notfound" width={200} height={200} />
      <h2 className="text-2xl font-bold">No files found</h2>
    </div>
  );
};

export default EmptyState;
