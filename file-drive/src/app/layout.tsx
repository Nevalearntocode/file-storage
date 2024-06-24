import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import ConvexClientProvider from "@/providers/convex-client-provider";
import Header from "./_components/header";
import { Toaster } from "@/components/ui/sonner";
import { OrganizationProvider } from "@/contexts/organization-context";
import ModalProvider from "@/providers/modal-provider";
import Sidebar from "./_components/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("", inter.className)}>
        <ConvexClientProvider>
          <OrganizationProvider>
            <Toaster />
            <ModalProvider />
            <Header />
            {children}
          </OrganizationProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
