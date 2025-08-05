import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { useMutation, useQuery } from 'convex/react'
import { MailIcon } from 'lucide-react'
import { api } from '../../convex/_generated/api'
import type { Id } from '../../convex/_generated/dataModel'

export function AcceptFriendRequestDialog() {
    const hasFriendRequests = useQuery(api.FriendRequest.getFriendRequests)
    const acceptFriendRequest = useMutation(api.FriendRequest.acceptFriendRequest)
    const rejectFriendRequest = useMutation(api.FriendRequest.rejectFriendRequest)
    const handleSubmit = (friendshipId: Id<'friendships'>) => {
        if (friendshipId) {
            acceptFriendRequest({ _id: friendshipId })
        }
    }
    const handleReject = (friendshipId: Id<'friendships'>) => {
        if (friendshipId) {
            rejectFriendRequest({ _id: friendshipId })
        }
    }

    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="outline">
                        {' '}
                        <MailIcon />
                        Friend Requests
                    </Button>
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
                                {hasFriendRequests?.length === 0 ? (
                                    <li>No pending requests</li>
                                ) : (
                                    hasFriendRequests?.map((user) => (
                                        <li key={user._id} className="flex items-center justify-between">
                                            <span>{user.requesterNickname ?? user.requesterId}</span>
                                            <div className="flex gap-2">
                                                <Button variant="ghost" size="sm" onClick={() => handleReject(user.friendshipId)}>
                                                    Reject
                                                </Button>
                                                <Button size="sm" className="bg-green-500" onClick={() => handleSubmit(user.friendshipId)}>
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
