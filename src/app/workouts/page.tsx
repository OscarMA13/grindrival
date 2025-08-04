import Topbar from '@/components/topbar'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

export default function workouts() {
    return (
        <div className="flex h-full w-full flex-col">
            <Topbar />
            <div className="flex flex-col gap-8 px-8 py-4">
                <div className="flex flex-row gap-8">
                    <DropdownMenu>
                        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Billing</DropdownMenuItem>
                            <DropdownMenuItem>Team</DropdownMenuItem>
                            <DropdownMenuItem>Subscription</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
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
                </div>
            </div>
        </div>
    )
}
