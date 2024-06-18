"use client";

import { useOrganization, useUser } from "@clerk/nextjs";
import { createContext, useContext } from "react";

type OrganizationContextType = {
  orgId: string;
};

export const OrganizationContext =
  createContext<OrganizationContextType | null>(null);

export const OrganizationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const organization = useOrganization();
  const user = useUser();
  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  if (!orgId) {
    return <>{children}</>;
  }

  return (
    <OrganizationContext.Provider value={{ orgId }}>
      {children}
    </OrganizationContext.Provider>
  );
};

export const useOrganizationContext = () => {
  return useContext(OrganizationContext);
};
