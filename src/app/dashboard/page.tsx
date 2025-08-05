'use client'

import { AcceptFriendRequestDialog } from '@/components/accpet-friend-request'
import DifferentList from '@/components/friends-list'
import { ProgressChart } from '@/components/progess-chart'
import RankCards from '@/components/rank-cards'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useUser } from '@clerk/nextjs'
import { useQuery } from 'convex/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { api } from '../../../convex/_generated/api'

export default function Dashboard() {
    const { isLoaded, isSignedIn } = useUser()
    const router = useRouter()
    const workouts = useQuery(api.workouts.getWorkoutsForCurrentUser)

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.push('/')
        }
    }, [isLoaded, isSignedIn, router])

    if (!isLoaded) {
        return <div>Loading...</div>
    }

    if (!isSignedIn) {
        return null
    }

    // Get the latest workout data
    const latestWorkout = workouts?.[0]

    // Create workout cards from real data or show default if no workouts
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
                <div className="flex flex-row justify-end gap-4">
                    <AcceptFriendRequestDialog />
                </div>
                {workouts?.[0]?._id && (
                    <div className="flex flex-col gap-8 md:flex-row">
                        {typesofworkouts.slice(0, 2).map((workout) => (
                            <RankCards key={workout.name} name={workout.name} weight={workout.weight ?? ''} id={workouts?.[0]._id ?? ''} />
                        ))}
                        {typesofworkouts.length > 2 && (
                            <div className="hidden md:flex-row">
                                <RankCards name={typesofworkouts[2].name} weight={typesofworkouts[2].weight ?? ''} id={workouts?.[0]._id ?? ''} />
                            </div>
                        )}
                    </div>
                )}

                {!latestWorkout && (
                    <Card className="w-full">
                        <CardContent className="p-6 text-center">
                            <p className="mb-4 text-gray-600">No workout data found. Complete your first survey to see your rankings!</p>
                            <Button onClick={() => router.push('/survey')}>Take Survey</Button>
                        </CardContent>
                    </Card>
                )}
                <div className="flex flex-col gap-8 md:flex-row">
                    <DifferentList isGroup={false} />
                    <DifferentList isGroup={true} />
                </div>
                <Card className="h-full w-full">
                    <CardHeader>
                        <CardTitle>Progress Chart</CardTitle>
                        <CardDescription>Track your progress over the last 6 months.</CardDescription>
                        <CardAction></CardAction>
                    </CardHeader>
                    <CardContent>
                        <ProgressChart />
                    </CardContent>
                    <CardFooter>
                        <Button>View Full Chart</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
