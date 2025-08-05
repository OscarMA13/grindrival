import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useMutation } from 'convex/react'
import { useState } from 'react'
import { api } from '../../convex/_generated/api'

export function SendFriendRequestDialog() {
    const [targetUserId, setTargetUserId] = useState('')
    const sendFriendRequest = useMutation(api.FriendRequest.sendFriendRequest)

    const handleSubmit = () => {
        sendFriendRequest({ nickname: targetUserId })
    }

    return (
        <Dialog>
            <form onSubmit={handleSubmit}>
                <DialogTrigger asChild>
                    <Button variant="outline">Add friends +</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Send Friend Request</DialogTitle>
                        <DialogDescription>Send a friend request to this user.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="targetUserId-1">Username</Label>
                            <Input
                                id="targetUserId-1"
                                name="targetUserId"
                                value={targetUserId}
                                onChange={(e) => setTargetUserId(e.target.value)}
                                placeholder="Enter Username"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button type="submit" onClick={handleSubmit}>
                                Send Request
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
