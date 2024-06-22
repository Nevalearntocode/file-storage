import { ConvexError, v } from "convex/values";
import { MutationCtx, QueryCtx, internalMutation, mutation, query } from "./_generated/server";
import { role } from "./schema";

export const getUser = async (
  ctx: QueryCtx | MutationCtx,
  tokenIdentifier: string,
) => {
  const user = await ctx.db
    .query("users")
    .withIndex("by_tokenIdentifier", (q) =>
      q.eq("tokenIdentifier", tokenIdentifier),
    )
    .first();

  if (!user) {
    throw new ConvexError("User not found");
  }

  return user;
};

export const createUser = internalMutation({
  args: {
    tokenIdentifier: v.string(),
    name: v.string(),
    image: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("users", {
      tokenIdentifier: args.tokenIdentifier,
      orgs: [],
      name: args.name,
      image: args.image,
    });
  },
});

export const updateUser = internalMutation({
  args: {
    tokenIdentifier: v.string(),
    name: v.optional(v.string()),
    image: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await getUser(ctx, args.tokenIdentifier);

    await ctx.db.patch(user._id, {
      name: args.name,
      image: args.image,
    });
  },
})

export const addOrgIdToUser = internalMutation({
  args: {
    tokenIdentifier: v.string(),
    orgId: v.string(),
    role: role,
  },
  handler: async (ctx, args) => {
    const user = await getUser(ctx, args.tokenIdentifier);

    await ctx.db.patch(user._id, {
      orgs: [
        ...user.orgs,
        {
          orgId: args.orgId,
          role: args.role,
        },
      ],
    });
  },
});

export const updateRoleInOrgForUser = internalMutation({
  args: {
    tokenIdentifier: v.string(),
    orgId: v.string(),
    role: role,
  },
  handler: async (ctx, args) => {
    const user = await getUser(ctx, args.tokenIdentifier);

    await ctx.db.patch(user._id, {
      orgs: user.orgs.map((org) => {
        if (org.orgId === args.orgId) {
          return {
            ...org,
            role: args.role,
          };
        } else {
          return org;
        }
      }),
    });
  },
});

export const getFileUser = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_id", (q) => q.eq("_id", args.userId))
      .first();
    if (!user) {
      throw new ConvexError("User not found");
    }
    return {
      name: user.name,
      image: user.image,
    }
  }
})