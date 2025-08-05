import { v } from 'convex/values'
import { mutation } from './_generated/server'

export const updateWeight = mutation({
    args: {
        _id: v.id('workouts'),
        weight: v.number(),
        workout: v.string()
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()
        if (!identity) {
            throw new Error('Not authenticated')
        }
        const currentUser = await ctx.db
            .query('users')
            .withIndex('by_clerk_id', (q) => q.eq('clerkId', identity.subject))
            .unique()

        if (!currentUser) {
            throw new Error('User not found')
        }
        if (!['bench', 'deadlift', 'squat'].includes(args.workout)) {
            throw new Error('Invalid workout type')
        }
        return await ctx.db.patch(args._id, {
            [args.workout]: args.weight
        })
    }
})
