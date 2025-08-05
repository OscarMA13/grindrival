import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { useMutation } from 'convex/react'
import { useState } from 'react'
import { api } from '../../convex/_generated/api'

import { useEffect } from 'react'

export function AcceptFriendRequestDialog() {
    const [targetUserId, setTargetUserId] = useState('')
    type FriendRequest = { requesterNickname: string | null }

    const hasFriendRequests = useMutation<typeof api.sendFriendRequest.getFriendRequests>(api.sendFriendRequest.getFriendRequests)

    const [friendRequests, setFriendRequests] = useState<string[]>([])

    useEffect(() => {
        async function fetchFriendRequests() {
            const requests = (await hasFriendRequests()) as FriendRequest[] | FriendRequest | null
            if (Array.isArray(requests)) {
                setFriendRequests(requests.map((request) => request.requesterNickname).filter((nickname): nickname is string => nickname !== null))
            } else if (requests && (requests as FriendRequest).requesterNickname) {
                setFriendRequests([(requests as FriendRequest).requesterNickname!])
            } else {
                setFriendRequests([])
            }
        }
        fetchFriendRequests()
    }, [])
    const handleSubmit = () => {}

    return (
        <Dialog>
            <form onSubmit={handleSubmit}>
                <DialogTrigger asChild>
                    <Button variant="outline">Open Dialog</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Friend Requests</DialogTitle>
                        <DialogDescription>Accept a friend request from these users.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label>Pending Friend Requests</Label>
                            <ul className="list-disc pl-5">
                                {friendRequests.length === 0 ? (
                                    <li>No pending requests</li>
                                ) : (
                                    friendRequests.map((userId) => (
                                        <li key={userId} className="flex items-center justify-between">
                                            <span>{userId}</span>
                                            <div className="flex gap-2">
                                                <Button variant="ghost" size="sm">
                                                    Reject
                                                </Button>
                                                <Button size="sm" className="bg-green-500" onClick={() => setTargetUserId(userId)}>
                                                    Accept
                                                </Button>
                                            </div>
                                        </li>
                                    ))
                                )}
                            </ul>
                        </div>
                    </div>
                </DialogContent>
            </form>
        </Dialog>
    )
}
