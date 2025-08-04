import { ProgressChart } from '@/components/progess-chart'
import RankCards from '@/components/rank-cards'
import Topbar from '@/components/top-bar'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Workout } from '../rank/page'
const typesofworkouts: Workout[] = [
    { name: 'Chest', rank: 'platinum', description: 'You are currently ranked Platinum in Chest.', weight: '100' },
    { name: 'Back', rank: 'gold', description: 'You are currently ranked Gold in Back.', weight: '90' }
]
export default function Dashboard() {
    return (
        <div className="flex h-full w-full flex-col">
            <Topbar />
            <div className="flex flex-col gap-8 px-8 py-4">
                <div className="flex flex-row gap-8">
                    {typesofworkouts.map((workout) => (
                        <RankCards key={workout.name} name={workout.name} rank={workout.rank} description={workout.description} weight={workout.weight ?? ''} />
                    ))}
                </div>
                <Card className="h-full w-full">
                    <CardHeader>
                        <CardTitle>List of friends</CardTitle>
                        <CardDescription></CardDescription>
                        <CardAction></CardAction>
                    </CardHeader>
                    <CardContent className="grid grid-cols-[1fr_2fr]">
                        <div>Image will go here </div>
                        <ul className="flex list-disc flex-col gap-5 pl-5">
                            <li className="flex flex-row items-center justify-between gap-2">
                                Alex Johnson <Button> Add your friend</Button>
                            </li>
                            <li className="flex flex-row items-center justify-between gap-2">
                                Maria Chen <Button> Add your friend</Button>
                            </li>
                            <li className="flex flex-row items-center justify-between gap-2">
                                Sam Patel <Button> Add your friend</Button>
                            </li>
                            <li className="flex flex-row items-center justify-between gap-2">
                                Jordan Lee <Button> Add your friend</Button>
                            </li>
                            <li className="flex flex-row items-center justify-between gap-2">
                                Chris Smith <Button> Add your friend</Button>
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button>Add Friend +</Button>
                    </CardFooter>
                </Card>
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
