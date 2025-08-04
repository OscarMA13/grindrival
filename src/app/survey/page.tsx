'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useMutation } from 'convex/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { api } from '../../../convex/_generated/api'

export default function SurveyPage() {
    const [bench, setBench] = useState('')
    const [squat, setSquat] = useState('')
    const [deadlift, setDeadlift] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const createWorkout = useMutation(api.workouts.createWorkout)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            await createWorkout({
                bench: Number(bench),
                squat: Number(squat),
                deadlift: Number(deadlift)
            })
            router.push('/dashboard')
        } catch (error) {
            console.error('Error creating workout:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div>
            <Card className="mx-auto mt-10 max-w-md p-6 shadow-lg">
                <form onSubmit={handleSubmit}>
                    <h2 className="mb-4 text-xl font-semibold">Survey</h2>
                    <p className="mb-6 text-gray-600">Please enter your response below:</p>
                    <div className="flex flex-col gap-4">
                        <CardContent className="flex flex-col gap-2">
                            <CardDescription>How much do you Bench?</CardDescription>
                            <Input type="number" placeholder="Enter weight in lbs" value={bench} onChange={(e) => setBench(e.target.value)} required />
                        </CardContent>
                        <CardContent className="flex flex-col gap-2">
                            <CardDescription>How much do you Squat?</CardDescription>
                            <Input type="number" placeholder="Enter weight in lbs" value={squat} onChange={(e) => setSquat(e.target.value)} required />
                        </CardContent>
                        <CardContent className="flex flex-col gap-2">
                            <CardDescription>How much do you Deadlift?</CardDescription>
                            <Input type="number" placeholder="Enter weight in lbs" value={deadlift} onChange={(e) => setDeadlift(e.target.value)} required />
                        </CardContent>
                    </div>
                    <Button type="submit" disabled={isSubmitting} className="mt-4 w-full">
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </Button>
                </form>
            </Card>
        </div>
    )
}
