import { MutationCtx, QueryCtx, mutation, query } from "./_generated/server";
import { getUser } from "./users";
import { Id } from "./_generated/dataModel";
import { ConvexError, v } from "convex/values";

export const userPrefix = "user"
export const orgPrefix = "org"

export const route = v.union(
  v.literal("all"),
  v.literal("favorites"),
  v.literal("archived"),
)

export const generateImageUrl = query({
  args: {
    fileId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.fileId);
  },
});


export const generateUploadUrl = mutation(async (ctx) => {
  const identity = await ctx.auth.getUserIdentity();

  if (!identity) {
    throw new ConvexError("You must be logged in to upload a file");
  }

  return await ctx.storage.generateUploadUrl();
});

export async function hasAccessToFile(
  ctx: QueryCtx | MutationCtx,
  fileId: Id<"files">,
  orgId: string,
) {
  const identity = await ctx.auth.getUserIdentity();

  if (!identity) {
    return null;
  }

  const hasAccess = await hasAccessToOrg(ctx, identity.tokenIdentifier, orgId);

  if (!hasAccess) {
    return null;
  }

  const file = await ctx.db.get(fileId);

  if (!file) {
    return null;
  }

  return {
    file,
    user: hasAccess.user,
  };
}

export async function hasAccessToOrg(
  ctx: QueryCtx | MutationCtx,
  tokenIdentifier: string,
  orgId: string,
) {
  const user = await getUser(ctx, tokenIdentifier);

  if (!user) {
    return null;
  }

  const isOrgMember = user.orgs.some((orgId) => orgId === orgId);
  const isPersonalAccount = user.tokenIdentifier.includes(orgId);
  const hasAccess = isOrgMember || isPersonalAccount;

  return {
    hasAccess,
    user,
  };
}
