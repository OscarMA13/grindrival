'use client'

import { SignedIn, UserButton } from '@clerk/nextjs'
import { Dumbbell, HomeIcon, Trophy } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'

type Tab = 'home' | 'workouts' | 'rank' | 'settings'

interface TopbarProps {
    activeTab?: Tab
    onTabChange?: (tab: Tab) => void
}

export default function Topbar() {
    const router = useRouter()

    return (
        <div className="flex w-full border px-4 py-4">
            <div className="flex w-full gap-4">
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
