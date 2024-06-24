import { Button } from "@/components/ui/button";
import { SignInButton, SignedOut } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const LandingPage = (props: Props) => {
  const { sessionId } = auth();

  if (sessionId) {
    return redirect(`/`);
  }

  return (
    <div className="container flex h-screen w-full flex-col items-center gap-y-4 pt-44">
      <h1 className="text-3xl font-bold">Welcome to Drive</h1>
      <p className="text-lg font-semibold">
        Login to start uploading and downloading files
      </p>
      <SignedOut>
        <SignInButton mode="modal">
          <Button>Sign In</Button>
        </SignInButton>
      </SignedOut>
    </div>
  );
};

export default LandingPage;
