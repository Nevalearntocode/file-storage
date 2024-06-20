import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const fileTypes = v.union(
  v.literal("image"),
  v.literal("csv"),
  v.literal("pdf"),
  v.literal("svg"),
);

export default defineSchema({
  files: defineTable({
    name: v.string(),
    orgId: v.string(),
    fileId: v.id("_storage"),
    size: v.number(),
    type: fileTypes,
  })
    .index("by_orgId", ["orgId"])
    .searchIndex("by_name", {
      searchField: "name",
      filterFields: ["orgId"],
    }),
  favorites: defineTable({
    orgId: v.string(),
    fileId: v.id("files"),
    userId: v.id("users"),
  }).index("by_userId_orgId_fileId", ["userId", "orgId", "fileId"]),
  users: defineTable({
    tokenIdentifier: v.string(),
    orgIds: v.array(v.string()),
  }).index("by_tokenIdentifier", ["tokenIdentifier"]),
});
