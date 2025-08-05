import { v } from 'convex/values'
import { Id } from './_generated/dataModel'
import { mutation } from './_generated/server'

// Helper function to ensure consistent ordering
function orderUserIds(userId1: Id<'users'>, userId2: Id<'users'>) {
    return userId1 < userId2 ? { user_id1: userId1, user_id2: userId2 } : { user_id1: userId2, user_id2: userId1 }
}

export const sendFriendRequest = mutation({
    args: {
        nickname: v.string()
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

        const targetUser = await ctx.db
            .query('users')
            .withIndex('by_nickname', (q) => q.eq('nickname', args.nickname))
            .unique()

        if (!targetUser) {
            throw new Error('Target user not found')
        }

        const { user_id1, user_id2 } = orderUserIds(currentUser._id, targetUser._id)

        return await ctx.db.insert('friendships', {
            user_id1,
            user_id2,
            status: 'pending',
            createdAt: Date.now(),
            updatedAt: Date.now()
        })
    }
})

export const getFriendRequests = mutation({
    args: {},
    handler: async (ctx) => {
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

        const friendRequests = await ctx.db
            .query('friendships')
            .withIndex('by_user2_status', (q) => q.eq('user_id2', currentUser._id).eq('status', 'pending'))
            .collect()

        // Fetch nicknames for each requester
        const requestsWithNicknames = await Promise.all(
            friendRequests.map(async (req) => {
                const requester = await ctx.db.get(req.user_id1)
                return {
                    ...req,
                    requesterId: requester?._id ?? null,
                    requesterNickname: requester?.nickname ?? null
                }
            })
        )

        return requestsWithNicknames
    }
})
