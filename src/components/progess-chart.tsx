'use client'

import { Bar, BarChart, XAxis, YAxis } from 'recharts'

import { ChartConfig, ChartContainer } from '@/components/ui/chart'
import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'

const chartData = [
    { month: 'January', cardio: 120, strength: 80 },
    { month: 'February', cardio: 140, strength: 100 },
    { month: 'March', cardio: 110, strength: 90 },
    { month: 'April', cardio: 160, strength: 120 },
    { month: 'May', cardio: 130, strength: 110 },
    { month: 'June', cardio: 150, strength: 115 }
]

const chartConfig = {
    cardio: {
        label: 'Cardio',
        color: '#2563eb'
    },
    strength: {
        label: 'Strength',
        color: '#60a5fa'
    }
} satisfies ChartConfig

export function ProgressChart() {
    const personal = useQuery(api.workouts.getWorkoutsForCurrentUser)
    const friendslist = useQuery(api.FriendRequest.friendsList)
    const workouts = useQuery(api.workouts.getUserWorkoutsById, friendslist?.[0]?.friendId ? { userId: friendslist[0].friendId } : 'skip')
    const benchData = [
        {
            name: 'Me',
            bench: personal?.reduce((max, workout) => (workout.bench && workout.bench > max ? workout.bench : max), 0) ?? 0
        },
        ...(friendslist?.map((friend) => {
            const friendWorkouts = workouts?.filter((w) => w.userId === friend.friendId) ?? []
            const maxBench = friendWorkouts.reduce((max, workout) => (workout.bench && workout.bench > max ? workout.bench : max), 0)
            return {
                name: friend.friendNickname ?? 'Friend',
                bench: maxBench
            }
        }) ?? [])
    ]
    const squatData = [
        {
            name: 'Me',
            squat: personal?.reduce((max, workout) => (workout.squat && workout.squat > max ? workout.squat : max), 0) ?? 0
        },
        ...(friendslist?.map((friend) => {
            const friendWorkouts = workouts?.filter((w) => w.userId === friend.friendId) ?? []
            const maxSquat = friendWorkouts.reduce((max, workout) => (workout.squat && workout.squat > max ? workout.squat : max), 0)
            return {
                name: friend.friendNickname ?? 'Friend',
                squat: maxSquat
            }
        }) ?? [])
    ]
    const deadliftData = [
        {
            name: 'Me',
            deadlift: personal?.reduce((max, workout) => (workout.deadlift && workout.deadlift > max ? workout.deadlift : max), 0) ?? 0
        },
        ...(friendslist?.map((friend) => {
            const friendWorkouts = workouts?.filter((w) => w.userId === friend.friendId) ?? []
            const maxDeadlift = friendWorkouts.reduce((max, workout) => (workout.deadlift && workout.deadlift > max ? workout.deadlift : max), 0)
            return {
                name: friend.friendNickname ?? 'Friend',
                deadlift: maxDeadlift
            }
        }) ?? [])
    ]
    return (
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart
                data={[
                    {
                        workout: 'Bench',
                        Me: benchData[0]?.bench ?? 0,
                        ...Object.fromEntries(benchData.slice(1).map((item) => [item.name, item.bench]))
                    },
                    {
                        workout: 'Squat',
                        Me: squatData[0]?.squat ?? 0,
                        ...Object.fromEntries(squatData.slice(1).map((item) => [item.name, item.squat]))
                    },
                    {
                        workout: 'Deadlift',
                        Me: deadliftData[0]?.deadlift ?? 0,
                        ...Object.fromEntries(deadliftData.slice(1).map((item) => [item.name, item.deadlift]))
                    }
                ]}
                barCategoryGap="30%"
                barGap={8}
            >
                <XAxis dataKey="workout" tick={{ fontSize: 14 }} label={{ value: 'Workout', position: 'insideBottom', offset: -5, fontSize: 15 }} />
                <YAxis tick={{ fontSize: 14 }} label={{ value: 'Weight (lbs)', angle: -90, position: 'insideLeft', fontSize: 15 }} />
                <Bar dataKey="Me" fill="#008000" radius={[8, 8, 0, 0]} maxBarSize={40} background={{ fill: '#f3f4f6', radius: 8 }} />
                {friendslist?.map((friend) => {
                    // Generate a random color for each friend
                    const randomColor = `#${Math.floor(Math.random() * 16777215)
                        .toString(16)
                        .padStart(6, '0')}`
                    return (
                        <Bar
                            key={friend.friendId}
                            dataKey={friend.friendNickname ?? 'Friend'}
                            fill={randomColor}
                            radius={[8, 8, 0, 0]}
                            maxBarSize={40}
                            background={{ fill: '#f3f4f6', radius: 8 }}
                        />
                    )
                })}
            </BarChart>
        </ChartContainer>
    )
}
