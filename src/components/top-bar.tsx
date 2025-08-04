'use client'

import { SignedIn, UserButton } from '@clerk/nextjs'
import { Dumbbell, Home, HomeIcon, Settings, Settings2, Trophy } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'

type Tab = 'home' | 'workouts' | 'rank' | 'settings'

interface TopbarProps {
    activeTab?: Tab
    onTabChange?: (tab: Tab) => void
}

export default function Topbar() {
    const router = useRouter()

    const tabs = [
        { id: 'home' as const, label: 'Home', icon: Home, link: 'dashboard' },
        { id: 'workouts' as const, label: 'Workouts', icon: Dumbbell, link: 'workouts' },
        { id: 'rank' as const, label: 'Rank', icon: Trophy, link: 'rank' },
        { id: 'settings' as const, label: 'Settings', icon: Settings, link: 'settings' }
    ]

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
                <Button variant="outline" onClick={() => router.push('/settings')}>
                    <Settings2 /> Settings
                </Button>
            </div>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </div>
    )
}
