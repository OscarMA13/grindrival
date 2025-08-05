import { mutation, query } from './_generated/server'

export const store = mutation({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity()
        if (!identity) {
            throw new Error('Called storeUser without authentication present')
        }

        // Check if we've already stored this user before.
        const user = await ctx.db
            .query('users')
            .withIndex('by_clerk_id', (q) => q.eq('clerkId', identity.subject))
            .unique()

        if (user !== null) {
            // If we've seen this identity before but the name has changed, patch the value.
            if (user.name !== identity.name) {
                await ctx.db.patch(user._id, { name: identity.name || '' })
            }
            return user._id
        }

        // If it's a new identity, create a new `User`.
        return await ctx.db.insert('users', {
            name: identity.name || '',
            email: identity.email || '',
            picture: identity.pictureUrl,
            nickname: identity.nickname,
            given_name: identity.givenName,
            family_name: identity.familyName,
            phone_number: identity.phoneNumber,
            email_verified: identity.emailVerified,
            phone_number_verified: identity.phoneNumberVerified,
            updated_at: identity.updatedAt ? Date.parse(identity.updatedAt) : undefined,
            clerkId: identity.subject
        })
    }
})

export const getUserInfo = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity()
        if (!identity) {
            throw new Error('Called getUserInfo without authentication present')
        }

        const user = await ctx.db
            .query('users')
            .withIndex('by_clerk_id', (q) => q.eq('clerkId', identity.subject))
            .unique()

        if (!user) {
            throw new Error('User not found')
        }

        return user
    }
})
