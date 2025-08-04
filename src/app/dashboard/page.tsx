import Topbar from '@/components/topbar'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function Dashboard() {
    return (
        <div className="flex h-full w-full flex-col">
            <Topbar />
            <div className="flex flex-col gap-8 px-8 py-4">
                <div className="flex flex-row gap-8">
                    <Card className="h-full w-full">
                        <CardHeader>
                            <CardTitle>Chest Rank</CardTitle>
                            <CardDescription>You are currently ranked in the top 10% of players.</CardDescription>
                            <CardAction></CardAction>
                        </CardHeader>
                        <CardContent>
                            <p>Image will go here with Rank</p>
                        </CardContent>
                        <CardFooter>
                            <Button>View Details</Button>
                        </CardFooter>
                    </Card>
                    <Card className="h-full w-full">
                        <CardHeader>
                            <CardTitle>Back Rank</CardTitle>
                            <CardDescription>You are currently ranked in the top 20% of players.</CardDescription>
                            <CardAction></CardAction>
                        </CardHeader>
                        <CardContent>
                            <p>Image will go here with Rank</p>
                        </CardContent>
                        <CardFooter>
                            <Button>View Details</Button>
                        </CardFooter>
                    </Card>
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
            </div>
        </div>
    )
}
