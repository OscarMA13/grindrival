'use client'

import { Dumbbell, Home, Settings, Trophy } from 'lucide-react'
import { useState } from 'react'

type Tab = 'home' | 'workouts' | 'rank' | 'settings'

interface TopbarProps {
    activeTab?: Tab
    onTabChange?: (tab: Tab) => void
}

export default function Topbar({ activeTab = 'home', onTabChange }: TopbarProps) {
    const [currentTab, setCurrentTab] = useState<Tab>(activeTab)

    const handleTabClick = (tab: Tab) => {
        setCurrentTab(tab)
        onTabChange?.(tab)
        // Navigate to the corresponding page
        if (typeof window !== 'undefined') {
            const target = tabs.find((t) => t.id === tab)?.link || tab
            window.location.href = `/${target}`
        }
    }

    const tabs = [
        { id: 'home' as const, label: 'Home', icon: Home, link: 'dashboard' },
        { id: 'workouts' as const, label: 'Workouts', icon: Dumbbell, link: 'workouts' },
        { id: 'rank' as const, label: 'Rank', icon: Trophy, link: 'rank' },
        { id: 'settings' as const, label: 'Settings', icon: Settings, link: 'settings' }
    ]

    return (
        <div className="bg-card border-border w-full border-b shadow-sm">
            <div className="flex items-center justify-center px-4 py-2">
                <nav className="bg-muted flex space-x-1 rounded-lg p-1">
                    {tabs.map((tab) => {
                        const Icon = tab.icon
                        const isActive = currentTab === tab.id

                        return (
                            <button
                                key={tab.id}
                                onClick={() => handleTabClick(tab.id)}
                                className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 ${
                                    isActive ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                                } `}
                            >
                                <Icon className="h-4 w-4" />
                                <span className="hidden sm:inline">{tab.label}</span>
                            </button>
                        )
                    })}
                </nav>
            </div>
        </div>
    )
}
