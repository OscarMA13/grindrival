import { cn } from '@/lib/utils'
import { useQuery } from 'convex/react'
import { useRouter } from 'next/navigation'
import { api } from '../../convex/_generated/api'
import { SendFriendRequestDialog } from './send-friend-request'
import { Button } from './ui/button'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'

export default function DifferentList({ isGroup }: { isGroup: boolean }) {
    const router = useRouter()
    const friends = useQuery(api.FriendRequest.friendsList)
    return (
        <Card className="flex h-full w-full">
            {friends?.length ? (
                <>
                    <CardHeader>
                        <CardTitle>{cn(!isGroup ? 'List of friends' : 'List of groups')}</CardTitle>
                        <CardDescription></CardDescription>
                        <CardAction></CardAction>
                    </CardHeader>
                    <CardContent>
                        {!isGroup ? (
                            <ul className="flex list-disc flex-col gap-5 pl-5">
                                {friends?.map((friend) => (
                                    <li key={friend.friendId} className="flex flex-col gap-8">
                                        <div className="flex items-center justify-between gap-4">
                                            <span>{friend.friendNickname}</span>
                                            <div className="flex gap-2">
                                                <Button variant="outline" size="sm" onClick={() => router.push(`/rank/${friend.friendId}`)}>
                                                    Check stats
                                                </Button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div>Coming soon</div>
                        )}
                    </CardContent>
                    <CardFooter>{!isGroup && <SendFriendRequestDialog />}</CardFooter>
                </>
            ) : (
                <div className="h-30 flex w-full flex-col items-center justify-center gap-4">
                    <p className="text-gray-400">{cn(!isGroup ? 'No friends added yet.' : 'No friends in this group.')}</p>
                    <SendFriendRequestDialog />
                </div>
            )}
        </Card>
    )
}
