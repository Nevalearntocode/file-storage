import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const fileTypes = v.union(
  v.literal("image"),
  v.literal("csv"),
  v.literal("pdf"),
  v.literal("svg"),
);

export const role = v.union(v.literal("admin"), v.literal("member"));

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
    orgs: v.array(v.object({ orgId: v.string(), role: role })),
  }).index("by_tokenIdentifier", ["tokenIdentifier"]),
});
