'use client'

import { CommandDialogDemo } from '@/components/combo-box'
import RankCards from '@/components/rank-cards'
import { useUser } from '@clerk/nextjs'
import { useQuery } from 'convex/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { api } from '../../../convex/_generated/api'

export interface Workout {
    name: string
    weight?: string
}

export default function Rank() {
    const { isLoaded, isSignedIn } = useUser()
    const router = useRouter()
    const workouts = useQuery(api.workouts.getWorkoutsForCurrentUser, isSignedIn ? {} : 'skip')
    const user = useQuery(api.users.getUserInfo, isSignedIn ? {} : 'skip')

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.push('/')
        }
    }, [isLoaded, isSignedIn, router])

    if (!isLoaded) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        )
    }

    if (!isSignedIn) {
        return null // Will redirect via useEffect
    }

    const latestWorkout = workouts?.[0]

    const typesofworkouts = latestWorkout
        ? [
              {
                  name: 'Bench',
                  weight: latestWorkout.bench.toString()
              },
              {
                  name: 'Squat',
                  weight: latestWorkout.squat.toString()
              },
              {
                  name: 'Deadlift',
                  weight: latestWorkout.deadlift.toString()
              }
          ]
        : [
              { name: 'Bench', weight: '0' },
              { name: 'Squat', weight: '0' },
              { name: 'Deadlift', weight: '0' }
          ]

    return (
        <div className="flex h-full w-full flex-col">
            <div className="flex flex-col gap-8 px-8 py-4">
                <div className="flex w-full flex-col gap-8">
                    <div className="flex justify-between">
                        <p className="text-2xl font-semibold">{`${user?.nickname || 'Your'}'s Ranks`}</p>
                        <CommandDialogDemo workouts={typesofworkouts} />
                    </div>
                    <div className="flex flex-col gap-8 md:grid md:grid-cols-2">
                        {typesofworkouts.map((workout) => (
                            <RankCards key={workout.name} name={workout.name} weight={workout.weight ?? ''} id={workouts?.[0]?._id} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
