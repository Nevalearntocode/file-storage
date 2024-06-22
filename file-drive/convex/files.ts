import { ConvexError, v } from "convex/values";
import { fileTypes } from "./schema";
import { internalMutation, mutation, query } from "./_generated/server";
import {
  hasAccessToFile,
  hasAccessToOrg,
  orgPrefix,
  route,
  userPrefix,
} from "./utils";

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
      userId: hasAccess.user._id
    });
  },
});

export const getFiles = query({
  args: {
    orgId: v.string(),
    searchQuery: v.optional(v.string()),
    route: route,
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
    const isFavorite = args.route === "favorites";
    const isArchived = args.route === "archived";

    if (searchQuery) {
      files = await ctx.db
        .query("files")
        .withSearchIndex("by_name", (q) =>
          q.search("name", searchQuery).eq("orgId", args.orgId),
        )
        .collect();
    }

    if (isFavorite) {
      const favoriteFiles = await ctx.db
        .query("favorites")
        .withIndex("by_userId_orgId_fileId", (q) =>
          q.eq("userId", hasAccess.user._id).eq("orgId", args.orgId),
        )
        .collect();

      files = files.filter((file) =>
        favoriteFiles.some((favorite) => favorite.fileId === file._id),
      );
    }

    if (isArchived) {
      files = files.filter((file) => file.archived);
    } else {
      files = files.filter((file) => !file.archived);
    }

    return files;
  },
});

export const toggleArchiveFile = mutation({
  args: {
    orgId: v.string(),
    fileId: v.id("files"),
  },
  handler: async (ctx, args) => {
    const hasAccess = await hasAccessToFile(ctx, args.fileId, args.orgId);

    if (!hasAccess) {
      throw new ConvexError("You do not have access to this file");
    }

    const { file, user } = hasAccess;

    if (args.orgId.startsWith(orgPrefix)) {
      const hasDeletePermission =
        user.orgs.find((org) => org.orgId === args.orgId)?.role === "admin";

      if (!hasDeletePermission) {
        throw new ConvexError("You do not have permission to delete this file");
      }
    }

    if (args.orgId.startsWith(userPrefix)) {
      const hasDeletePermission = user.tokenIdentifier.includes(args.orgId);

      if (!hasDeletePermission) {
        throw new ConvexError("You do not have permission to delete this file");
      }
    }

    if (file.archived) {
      await ctx.db.patch(file._id, { archived: false });
    } else {
      await ctx.db.patch(file._id, { archived: true });
      const favorite = await ctx.db
        .query("favorites")
        .withIndex("by_userId_orgId_fileId", (q) =>
          q
            .eq("userId", user._id)
            .eq("orgId", args.orgId)
            .eq("fileId", file._id),
        )
        .first();
      if (favorite) {
        await ctx.db.delete(favorite._id);
      }
    }
  },
});

export const deleteFiles = internalMutation({
  handler: async (ctx) => {
    const archivedFiles = await ctx.db
      .query("files")
      .withIndex("by_archived", (q) => q.eq("archived", true))
      .collect();
    await Promise.all(
      archivedFiles.map(async (file) => {
        await ctx.storage.delete(file.fileId);
        return await ctx.db.delete(file._id);
      }),
    );
  },
});

export const toggleFavorite = mutation({
  args: {
    fileId: v.id("files"),
    orgId: v.string(),
  },
  handler: async (ctx, args) => {
    const hasAccess = await hasAccessToFile(ctx, args.fileId, args.orgId);

    if (!hasAccess) {
      throw new ConvexError("You do not have access to this file");
    }

    const { user, file } = hasAccess;

    const favorite = await ctx.db
      .query("favorites")
      .withIndex("by_userId_orgId_fileId", (q) =>
        q.eq("userId", user._id).eq("orgId", args.orgId).eq("fileId", file._id),
      )
      .first();

    if (favorite) {
      await ctx.db.delete(favorite._id);
    } else {
      await ctx.db.insert("favorites", {
        orgId: args.orgId,
        fileId: args.fileId,
        userId: user._id,
      });
    }
  },
});

export const isFavorite = query({
  args: {
    fileId: v.id("files"),
    orgId: v.string(),
  },
  handler: async (ctx, args) => {
    const hasAccess = await hasAccessToFile(ctx, args.fileId, args.orgId);

    if (!hasAccess) {
      throw new ConvexError("You do not have access to this file");
    }

    const { user, file } = hasAccess;

    const favorite = await ctx.db
      .query("favorites")
      .withIndex("by_userId_orgId_fileId", (q) =>
        q.eq("userId", user._id).eq("orgId", args.orgId).eq("fileId", file._id),
      )
      .first();

    return !!favorite;
  },
});
