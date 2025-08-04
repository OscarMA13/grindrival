'use client'
import { CommandDialogDemo } from '@/components/combo-box'
import RankCards from '@/components/rank-cards'
import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'

export interface Workout {
    name: string

    weight?: string
}

export default function Rank() {
    const workouts = useQuery(api.workouts.getWorkoutsForCurrentUser)
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
                    <div className="flex justify-end">
                        <CommandDialogDemo workouts={typesofworkouts} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {typesofworkouts.map((workout) => (
                            <RankCards key={workout.name} name={workout.name} weight={workout.weight ?? ''} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
