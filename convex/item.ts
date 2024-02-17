import { v } from "convex/values";
import { query } from "./_generated/server";

export interface itemSchema {
    orderId: string,
    name: string,
    healthScore: number,
    calories: number,
    servingSize: string
}

export const get = query({
    args: { orderId: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db.query("items").filter(q => q.eq(q.field("orderId"), args.orderId)).collect();
    },
});