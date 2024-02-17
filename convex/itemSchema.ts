import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";


export default defineSchema({
    items: defineTable({
        orderId: v.string(),
        name: v.string(),
        healthScore: v.number(),
        calories: v.number(),
        servingSize: v.string()
    })
});
