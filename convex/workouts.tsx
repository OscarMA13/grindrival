import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const createWorkout = mutation({
    args: {
        bench: v.number(),
        squat: v.number(),
        deadlift: v.number()
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()
        if (!identity) {
            throw new Error('Not authenticated')
        }

        // Get the user from our users table
        const user = await ctx.db
            .query('users')
            .withIndex('by_clerk_id', (q) => q.eq('clerkId', identity.subject))
            .unique()

        if (!user) {
            throw new Error('User not found')
        }

        // Insert the workout data
        const workoutId = await ctx.db.insert('workouts', {
            userId: user._id,
            bench: args.bench,
            squat: args.squat,
            deadlift: args.deadlift,
            createdAt: Date.now()
        })

        return workoutId
    }
})

// Optional: Query to get workouts for the current user
export const getWorkoutsForCurrentUser = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity()
        if (!identity) {
            return []
        }

        const user = await ctx.db
            .query('users')
            .withIndex('by_clerk_id', (q) => q.eq('clerkId', identity.subject))
            .unique()

        if (!user) {
            return []
        }

        return await ctx.db
            .query('workouts')
            .withIndex('by_user', (q) => q.eq('userId', user._id))
            .order('desc')
            .collect()
    }
})

export const getUserWorkoutsById = query({
    args: { userId: v.id('users') },
    handler: async (ctx, args) => {
        return await ctx.db
            .query('workouts')
            .withIndex('by_user', (q) => q.eq('userId', args.userId))
            .order('desc')
            .collect()
    }
})

export const getUserWorkoutsByIdsList = query({
    args: { userIds: v.array(v.id('users')) },
    handler: async (ctx, args) => {
        return await ctx.db
            .query('workouts')
            .filter((q) => q.or(...args.userIds.map((userId) => q.eq(q.field('userId'), userId))))
            .order('desc')
            .collect()
    }
})
