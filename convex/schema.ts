import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
    users: defineTable({
        name: v.string(),
        email: v.string(),
        picture: v.optional(v.string()),
        nickname: v.optional(v.string()),
        given_name: v.optional(v.string()),
        family_name: v.optional(v.string()),
        phone_number: v.optional(v.string()),
        email_verified: v.optional(v.boolean()),
        phone_number_verified: v.optional(v.boolean()),
        updated_at: v.optional(v.number()),
        clerkId: v.string()
    })
        .index('by_clerk_id', ['clerkId'])
        .index('by_nickname', ['nickname']),

    workouts: defineTable({
        userId: v.id('users'),
        bench: v.number(),
        squat: v.number(),
        deadlift: v.number(),
        createdAt: v.number()
    }).index('by_user', ['userId']),

    friendships: defineTable({
        user_id1: v.id('users'),
        user_id2: v.id('users'),
        status: v.union(v.literal('pending'), v.literal('accepted'), v.literal('declined'), v.literal('blocked')),
        createdAt: v.number(),
        updatedAt: v.number()
    })
        .index('by_user1', ['user_id1'])
        .index('by_user2', ['user_id2'])
        .index('by_status', ['status'])
        .index('by_user1_status', ['user_id1', 'status'])
        .index('by_user2_status', ['user_id2', 'status'])
})
