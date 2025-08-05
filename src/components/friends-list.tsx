import { SendFriendRequestDialog } from './send-friend-request'
import { Button } from './ui/button'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'

export default function FriendsList() {
    return (
        <Card className="flex h-full w-full items-center justify-center">
            {/* Example friends array */}
            {false ? (
                <>
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
                </>
            ) : (
                <div className="h-30 flex w-full flex-col items-center justify-center gap-4">
                    <p className="text-gray-400">No friends added yet.</p>
                    <SendFriendRequestDialog />
                </div>
            )}
        </Card>
    )
}
