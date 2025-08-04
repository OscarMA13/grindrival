'use client'

import { Line, LineChart, XAxis, YAxis } from 'recharts'

import { ChartConfig, ChartContainer } from '@/components/ui/chart'

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
    return (
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <LineChart accessibilityLayer data={chartData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Line type="monotone" dataKey="cardio" stroke={chartConfig.cardio.color} strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="strength" stroke={chartConfig.strength.color} strokeWidth={2} dot={false} />
            </LineChart>
        </ChartContainer>
    )
}
