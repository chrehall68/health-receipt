import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import uuid from 'react-native-uuid';

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
        return await ctx.db.query("orders_").filter(q => q.eq(q.field("userId"), args.userId)).collect()
    }
})

export const get = query({
    args: { orderId: v.string(), userId: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db.query("items_").filter(q => q.and(q.eq(q.field("orderId"), args.orderId), q.eq(q.field("userId"), args.userId))).collect();
    },
});

export const post = mutation({
    args: { foods: v.array(v.string()), userId: v.string() },
    handler: async (ctx, args) => {
        const uuid_ = uuid.v4();
        args.foods.forEach(food => ctx.db.insert("items_", {
            userId: args.userId,
            orderId: uuid_.toString(),
            name: food,
        }));

        ctx.db.insert("orders_", { userId: args.userId, orderId: uuid_.toString(), score: 0 });
    }
})