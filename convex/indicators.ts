import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getIndicators = query({
  args: {},
  handler: async (ctx) => {
    const indicators = await ctx.db
      .query("indicators")
      .withIndex("by_active", (q) => q.eq("isActive", true))
      .collect();
    return indicators;
  },
});

export const getIndicatorsByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    const indicators = await ctx.db
      .query("indicators")
      .withIndex("by_category", (q) => q.eq("category", args.category))
      .collect();
    return indicators.filter((i) => i.isActive);
  },
});

export const createIndicator = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    category: v.string(),
    version: v.string(),
    price: v.number(),
    features: v.array(v.string()),
    downloadUrl: v.optional(v.string()),
    thumbnailUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const indicatorId = await ctx.db.insert("indicators", {
      ...args,
      isActive: true,
      createdAt: Date.now(),
    });
    return indicatorId;
  },
});
