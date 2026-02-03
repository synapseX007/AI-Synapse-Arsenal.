import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    subscriptionTier: v.optional(v.string()),
    createdAt: v.optional(v.number()),
    lastLoginAt: v.optional(v.number()),
  }),

  signals: defineTable({
    pair: v.string(),
    direction: v.string(),
    entry: v.number(),
    stopLoss: v.number(),
    takeProfit1: v.number(),
    takeProfit2: v.optional(v.number()),
    takeProfit3: v.optional(v.number()),
    status: v.string(),
    riskRewardRatio: v.number(),
    confidence: v.string(),
    notes: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
    expiresAt: v.optional(v.number()),
  })
    .index("by_status", ["status"])
    .index("by_pair", ["pair"])
    .index("by_created", ["createdAt"]),

  indicators: defineTable({
    name: v.string(),
    description: v.string(),
    category: v.string(),
    version: v.string(),
    price: v.number(),
    features: v.array(v.string()),
    downloadUrl: v.optional(v.string()),
    thumbnailUrl: v.optional(v.string()),
    isActive: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
  })
    .index("by_category", ["category"])
    .index("by_active", ["isActive"]),

  subscriptions: defineTable({
    userId: v.id("users"),
    plan: v.string(),
    status: v.string(),
    priceMonthly: v.number(),
    startDate: v.number(),
    endDate: v.optional(v.number()),
    trialEndsAt: v.optional(v.number()),
    cancelledAt: v.optional(v.number()),
    features: v.array(v.string()),
  })
    .index("by_user", ["userId"])
    .index("by_status", ["status"]),
});
