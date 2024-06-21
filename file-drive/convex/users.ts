import { ConvexError, v } from "convex/values";
import { MutationCtx, QueryCtx, internalMutation } from "./_generated/server";
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
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("users", {
      tokenIdentifier: args.tokenIdentifier,
      orgs: [],
    });
  },
});

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
