import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getActiveSignals = query({
  args: {},
  handler: async (ctx) => {
    const signals = await ctx.db
      .query("signals")
      .withIndex("by_status", (q) => q.eq("status", "active"))
      .order("desc")
      .take(50);
    return signals;
  },
});

export const getRecentSignals = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 20;
    const signals = await ctx.db
      .query("signals")
      .withIndex("by_created")
      .order("desc")
      .take(limit);
    return signals;
  },
});

export const createSignal = mutation({
  args: {
    pair: v.string(),
    direction: v.string(),
    entry: v.number(),
    stopLoss: v.number(),
    takeProfit1: v.number(),
    takeProfit2: v.optional(v.number()),
    takeProfit3: v.optional(v.number()),
    riskRewardRatio: v.number(),
    confidence: v.string(),
    notes: v.optional(v.string()),
    expiresAt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const signalId = await ctx.db.insert("signals", {
      ...args,
      status: "pending",
      createdAt: Date.now(),
    });
    return signalId;
  },
});

export const updateSignalStatus = mutation({
  args: {
    signalId: v.id("signals"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.signalId, {
      status: args.status,
      updatedAt: Date.now(),
    });
  },
});
