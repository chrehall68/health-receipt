import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";


export default defineSchema({
    items: defineTable({
        userId: v.string(),
        orderId: v.string(),
        name: v.string(),
        healthScore: v.number(),
        calories: v.number(),
        servingSize: v.string()
    }),
    orders: defineTable({
        userId: v.string(),
        orderId: v.string(),
    })
});
