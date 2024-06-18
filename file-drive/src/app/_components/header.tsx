"use client";

import { Button } from "@/components/ui/button";
import {
  SignInButton,
  useSession,
  UserButton,
  OrganizationSwitcher,
  SignedOut,
} from "@clerk/nextjs";
import React from "react";

type Props = {};

const Header = (props: Props) => {
  return (
    <div className="border-b bg-gray-200 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-3xl font-bold">Drive</h1>
        <div className="flex items-center gap-4">
          <OrganizationSwitcher />
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {},
              layout: {},
              variables: {},
            }}
          />
        </div>
        <SignedOut>
          <SignInButton mode="modal">
            <Button>Sign In</Button>
          </SignInButton>
        </SignedOut>
      </div>
    </div>
  );
};

export default Header;
