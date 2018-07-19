import * as bcrypt from "bcryptjs"
import * as jwt from "jsonwebtoken"
import { Context, getUserId } from "../../utils"

export const auth = {
  async signup(parent, args, ctx: Context, info) {
    const password = await bcrypt.hash(args.password, 10)
    const user = await ctx.db.mutation.createUser({
      data: { ...args, password }
    })

    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user
    }
  },

  async login(parent, { email, password }, ctx: Context, info) {
    const user = await ctx.db.query.user({ where: { email } })
    if (!user) {
      throw new Error(`No such user found for email: ${email}`)
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      throw new Error("Invalid password")
    }

    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user
    }
  },
  async createTweet(parent, args, ctx, info) {
    const id = getUserId(ctx)
    const tweet = await ctx.db.mutation.createTweet(
      {
        data: {
          text: args.text,
          author: {
            connect: {
              id: id
            }
          }
        }
      },
      info
    )
    return tweet
  },
  async follow(parent, args, ctx, info) {
    const id = getUserId(ctx)
    const updatedUser = await ctx.db.mutation.updateUser(
      {
        data: {
          followers: {
            connect: {
              email: args.email
            }
          }
        },
        where: {
          id: id
        }
      },
      info
    )
    return updatedUser
  },
  async unfollow(parent, args, ctx, info) {
    const id = getUserId(ctx)
    const updatedUser = await ctx.db.mutation.updateUser(
      {
        data: {
          followers: {
            disconnect: {
              email: args.email
            }
          }
        },
        where: {
          id: id
        }
      },
      info
    )
    return updatedUser
  },
  async deleteUser(parent, args, ctx, info) {
    const id = args.id
    const deletedUser = await ctx.db.mutation.deleteUser(
      {
        where: { id }
      },
      info
    )
    return deletedUser
  }
}
