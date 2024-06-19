import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Doc, Id } from "../../convex/_generated/dataModel"
import { env } from "@/env";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Converts a MIME type string to one of the allowed types of documents in the "files" table.
export function typeConverter(mimeType: string): Doc<"files">["type"] {
  switch (mimeType) {
    case "image/png":
    case "image/jpeg":
      return "image";
    case "application/pdf":
      return "pdf";
    case "text/csv":
      return "csv";
    case "image/svg+xml":
      return "svg";
    default:
      throw new Error(`Unsupported MIME type: ${mimeType}`);
  }
}

export function getFileUrl(fileId: Id<"_storage">): string {
  return `${env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${fileId}`
}