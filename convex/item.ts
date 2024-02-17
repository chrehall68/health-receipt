import { v } from "convex/values";
import { query } from "./_generated/server";

export interface itemSchema {
    orderId: string,
    name: string,
    healthScore: number,
    calories: number,
    servingSize: string
}
export const getUserHistory = query({
    args: { userId: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db.query("orders").filter(q => q.eq(q.field("userId"), args.userId)).collect()
    }
})

export const get = query({
    args: { orderId: v.string(), userId: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db.query("items").filter(q => q.and(q.eq(q.field("orderId"), args.orderId), q.eq(q.field("userId"), args.userId))).collect();
    },
});