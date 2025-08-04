import { Button } from './ui/button'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'

export default function rankCards({ name, rank, description, weight }: { name: string; rank?: string; description: string; weight: string }) {
    return (
        <Card className="h-full w-full">
            <CardHeader>
                <CardTitle className="text-xl font-semibold">{name} Rank</CardTitle>
                <CardDescription>
                    <p>current weight: {weight} kg</p>
                </CardDescription>
                <CardAction></CardAction>
            </CardHeader>
            <CardContent>
                <div className="flex w-full flex-col items-center justify-between gap-4">
                    {rank && (
                        <>
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
                                alt={`${name} image`}
                                className="h-30 w-20"
                            />
                            <p>{description}</p>
                        </>
                    )}
                </div>
            </CardContent>
            <CardFooter>
                <Button>update weight</Button>
            </CardFooter>
        </Card>
    )
}
