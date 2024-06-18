import { ConvexError, v } from "convex/values";
import { MutationCtx, QueryCtx, mutation, query } from "./_generated/server";
import { getUser } from "./users";

export const generateUploadUrl = mutation(async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
        throw new ConvexError("You must be logged in to upload a file")
    }

    return await ctx.storage.generateUploadUrl();
});

async function hasAccessToOrg(
    ctx: QueryCtx | MutationCtx, tokenIdentifier: string, orgId: string
) {
    const user = await getUser(ctx, tokenIdentifier)

    const isOrgMember = user.orgIds.includes(orgId)
    const isPersonalAccount = user.tokenIdentifier.includes(orgId)
    const hasAccess = isOrgMember || isPersonalAccount

    return hasAccess

}

export const createFile = mutation(
    {
        args: {
            name: v.string(),
            orgId: v.string(),
            fileId: v.id("_storage")
        },
        handler: async (ctx, args) => {

            const identity = await ctx.auth.getUserIdentity()

            if (!identity) {
                throw new ConvexError("You must be logged in to upload a file")
            }

            const hasAccess = await hasAccessToOrg(ctx, identity.tokenIdentifier, args.orgId)

            if (!hasAccess) {
                throw new ConvexError("You do not have access to this org")
            }

            await ctx.db.insert("files", {
                name: args.name,
                orgId: args.orgId,
                fileId: args.fileId
            })
        }
    }
)

export const getFiles = query({
    args: {
        orgId: v.string()
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()

        if (!identity) {
            return []
        }

        const hasAccess = await hasAccessToOrg(ctx, identity.tokenIdentifier, args.orgId)

        if (!hasAccess) {
            return []
        }

        // Query the "files" table for documents where the "orgId" field matches
        // the "orgId" argument passed to the function. Return the documents as an array.
        return await ctx.db.query("files").withIndex("by_orgId", q => q.eq("orgId", args.orgId)).collect()
    }
})