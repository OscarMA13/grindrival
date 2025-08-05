import { Id } from '../../convex/_generated/dataModel'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import UpdateWorkout from './update-workout'

export function getRank(weight: number, exercise: 'bench' | 'squat' | 'deadlift'): string {
    // You can adjust these thresholds based on your ranking system
    const thresholds = {
        bench: { bronze: 135, silver: 185, gold: 225, platinum: 315 },
        squat: { bronze: 185, silver: 275, gold: 365, platinum: 455 },
        deadlift: { bronze: 185, silver: 275, gold: 365, platinum: 455 }
    }

    const exerciseThresholds = thresholds[exercise]
    if (!exerciseThresholds) return 'bronze'
    if (weight >= exerciseThresholds.platinum) return 'platinum'
    if (weight >= exerciseThresholds.gold) return 'gold'
    if (weight >= exerciseThresholds.silver) return 'silver'
    return 'bronze'
}

export default function RankCards({ name, weight, id, friends }: { name: string; weight: string; id?: string; friends?: boolean }) {
    // Convert weight to number and determine rank
    const weightNum = Number(weight) || 0
    const exerciseType = name.toLowerCase() as 'bench' | 'squat' | 'deadlift'
    const rank = getRank(weightNum, exerciseType)

    // Generate description based on calculated rank
    const descriptions: Record<string, string> = {
        bronze: ` Everyone starts somewhere—keep grinding!`,
        silver: ` Not bad! You're lifting more than most gym newbies.`,
        gold: ` Impressive! People are starting to ask for your advice.`,
        platinum: ` Are you secretly a superhero? The gym fears you.`
    }
    const description = descriptions[rank]

    return (
        <Card className="md:h-full md:w-full">
            <CardHeader>
                <CardTitle className="text-xl font-semibold">{name} Rank</CardTitle>
                <CardDescription>
                    <p>Current weight: {weight} lbs</p>
                </CardDescription>
                <CardAction></CardAction>
            </CardHeader>
            <CardContent>
                <div className="flex w-full flex-col items-center justify-between gap-4">
                    <img
                        src={
                            rank === 'bronze'
                                ? '/images/bronze.png'
                                : rank === 'silver'
                                  ? '/images/silver.png'
                                  : rank === 'gold'
                                    ? '/images/gold.png'
                                    : rank === 'platinum'
                                      ? '/images/plat.png'
                                      : '/images/default.png'
                        }
                        alt={`${rank} rank badge`}
                        className="h-30 w-20"
                    />
                    <p className="text-center text-sm">{description}</p>
                </div>
            </CardContent>
            <CardFooter>{!friends && <UpdateWorkout id={id as Id<'workouts'>} workoutType={exerciseType} weight={weightNum} />}</CardFooter>
        </Card>
    )
}
