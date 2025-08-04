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
    }).index('by_clerk_id', ['clerkId']),

    workouts: defineTable({
        userId: v.id('users'),
        bench: v.number(),
        squat: v.number(),
        deadlift: v.number(),
        createdAt: v.number()
    }).index('by_user', ['userId'])
})
