import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const fileTypes = v.union(
  v.literal("csv"),
  v.literal("image"),
  v.literal("pdf"),
  v.literal("svg"),
);

export const role = v.union(v.literal("admin"), v.literal("member"));

export default defineSchema({
  favorites: defineTable({
    orgId: v.string(),
    fileId: v.id("files"),
    userId: v.id("users"),
  }).index("by_userId_orgId_fileId", ["userId", "orgId", "fileId"]),

  files: defineTable({
    name: v.string(),
    orgId: v.string(),
    fileId: v.id("_storage"),
    userId: v.id("users"),
    size: v.number(),
    type: fileTypes,
    archived: v.optional(v.boolean()),
  })
    .index("by_archived", ["archived"])
    .index("by_orgId", ["orgId"])
    .searchIndex("by_name", {
      searchField: "name",
      filterFields: ["orgId"],
    }),

  users: defineTable({
    orgs: v.array(v.object({ orgId: v.string(), role: role })),
    tokenIdentifier: v.string(),
    name: v.string(),
    image: v.string(),
  }).index("by_tokenIdentifier", ["tokenIdentifier"]),
});
