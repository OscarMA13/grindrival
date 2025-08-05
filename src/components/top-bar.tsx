'use client'

import { SignedIn, UserButton, useUser } from '@clerk/nextjs'
import { Dumbbell, HomeIcon, Trophy } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from './ui/button'

export default function Topbar() {
    const router = useRouter()
    const pathname = usePathname()

    const { isSignedIn } = useUser()
    if (!isSignedIn) return null

    if (pathname === '/') return null

    return (
        <div className="flex w-full border px-4 py-4">
            <div className="flex w-full gap-2 md:gap-4">
                <Button variant="outline" onClick={() => router.push('/dashboard')}>
                    <HomeIcon /> Home
                </Button>
                <Button variant="outline" onClick={() => router.push('/workouts')}>
                    <Dumbbell /> Workouts
                </Button>
                <Button variant="outline" onClick={() => router.push('/rank')}>
                    <Trophy /> Rank
                </Button>
            </div>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </div>
    )
}
