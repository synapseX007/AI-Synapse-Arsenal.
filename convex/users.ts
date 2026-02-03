import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const upsertUser = mutation({
  args: {
    email: v.string(),
    name: v.optional(v.string()),
    image: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .unique();

    if (user) {
      await ctx.db.patch(user._id, { name: args.name, image: args.image });
      return { id: user._id.toString(), isNew: false };
    }

    const userId = await ctx.db.insert("users", {
      email: args.email,
      name: args.name,
      image: args.image,
      createdAt: Date.now(),
    });

    return { id: userId.toString(), isNew: true };
  },
});

export const getUser = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .unique();
  },
});
