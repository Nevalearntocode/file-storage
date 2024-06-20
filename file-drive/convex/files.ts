import { ConvexError, v } from "convex/values";
import { MutationCtx, QueryCtx, mutation, query } from "./_generated/server";
import { getUser } from "./users";
import { fileTypes } from "./schema";

export const generateUploadUrl = mutation(async (ctx) => {
  const identity = await ctx.auth.getUserIdentity();

  if (!identity) {
    throw new ConvexError("You must be logged in to upload a file");
  }

  return await ctx.storage.generateUploadUrl();
});

async function hasAccessToOrg(
  ctx: QueryCtx | MutationCtx,
  tokenIdentifier: string,
  orgId: string,
) {
  const user = await getUser(ctx, tokenIdentifier);

  const isOrgMember = user.orgIds.includes(orgId);
  const isPersonalAccount = user.tokenIdentifier.includes(orgId);
  const hasAccess = isOrgMember || isPersonalAccount;

  return hasAccess;
}

export const createFile = mutation({
  args: {
    name: v.string(),
    orgId: v.string(),
    fileId: v.id("_storage"),
    size: v.number(),
    type: fileTypes,
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("You must be logged in to upload a file");
    }

    const hasAccess = await hasAccessToOrg(
      ctx,
      identity.tokenIdentifier,
      args.orgId,
    );

    if (!hasAccess) {
      throw new ConvexError("You do not have access to this org");
    }

    await ctx.db.insert("files", {
      name: args.name,
      orgId: args.orgId,
      fileId: args.fileId,
      type: args.type,
      size: args.size,
    });
  },
});

const SortType = v.optional(v.union(v.literal("asc"), v.literal("desc")));

export const getFiles = query({
  args: {
    orgId: v.string(),
    searchQuery: v.optional(v.string()),
    nameSort: SortType,
    sizeSort: SortType,
    dateSort: SortType,
    fileType: v.optional(fileTypes),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      return [];
    }

    const hasAccess = await hasAccessToOrg(
      ctx,
      identity.tokenIdentifier,
      args.orgId,
    );

    if (!hasAccess) {
      return [];
    }
    let files = await ctx.db
      .query("files")
      .withIndex("by_orgId", (q) => q.eq("orgId", args.orgId))
      .collect();

    const searchQuery = args.searchQuery;
    const fileType = args.fileType;
    const nameSort = args.nameSort;
    const sizeSort = args.sizeSort;
    const dateSort = args.dateSort;

    if(fileType){
      files = files.filter((file) => file.type === fileType);
    }

    if (searchQuery) {
      files = files.filter((file) =>
        file.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (nameSort) {
      files = files.sort((a, b) => {
        if (nameSort === "asc") {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
    }

    if (sizeSort) {
      files = files.sort((a, b) => {
        if (sizeSort === "asc") {
          return a.size - b.size;
        } else {
          return b.size - a.size;
        }
      });
    }

    if (dateSort) {
      files = files.sort((a, b) => {
        if (dateSort === "asc") {
          return a._creationTime - b._creationTime;
        } else {
          return b._creationTime - a._creationTime;
        }
      });
    }

    return files;
  },
});

export const deleteFile = mutation({
  args: {
    orgId: v.string(),
    fileId: v.id("files"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("You must be logged in to delete a file");
    }

    const hasAccess = await hasAccessToOrg(
      ctx,
      identity.tokenIdentifier,
      args.orgId,
    );

    if (!hasAccess) {
      throw new ConvexError("You do not have access to this org");
    }

    const file = await ctx.db.get(args.fileId);

    if (!file) {
      throw new ConvexError("File not found");
    }

    await ctx.db.delete(file._id);
  },
});

export const generateImageUrl = query({
  args: {
    fileId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.fileId);
  },
});
