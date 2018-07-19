import { forwardTo } from "prisma-binding"
import { getUserId, Context } from "../utils"

export const Query = {
  async me(parent, args, ctx: Context, info) {
    const id = getUserId(ctx)
    return await ctx.db.query.user({ where: { id } }, info)
  },
  async feed(parent, args, ctx: Context, info) {
    return await ctx.db.query.tweets(
      {
        orderBy: args.orderBy
      },
      info
    )
  },
  async tweetById(parent, args, ctx: Context, info) {
    const id = args.id
    return await ctx.db.query.tweet({ where: { id } }, info)
  },
  async userById(parent, args, ctx: Context, info) {
    const id = args.id
    return await ctx.db.query.user({ where: { id } }, info)
  },
  async users(parent, args, ctx: Context, info) {
    return await ctx.db.query.users({ where: { ...args.where } }, info)
  }
}
