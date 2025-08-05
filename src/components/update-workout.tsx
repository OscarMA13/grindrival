import { useMutation } from 'convex/react'
import { useState } from 'react'
import { Label } from 'recharts'
import { api } from '../../convex/_generated/api'
import { Id } from '../../convex/_generated/dataModel'
import { Button } from './ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Input } from './ui/input'

export default function UpdateWorkout({ id, workoutType, name, weight }: { id: Id<'workouts'>; workoutType: string; name?: string; weight?: number }) {
    const updateWeight = useMutation(api.updateWeight.updateWeight)
    const [newWeight, setNewWeight] = useState(weight || '')

    const handleSubmit = () => {
        updateWeight({ _id: id, weight: Number(newWeight), workout: workoutType })
    }

    return (
        <Dialog>
            <form onSubmit={handleSubmit}>
                <DialogTrigger asChild>
                    <Button variant="outline">Update Weight</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Current {workoutType} Weight</DialogTitle>
                        <DialogDescription>
                            {name} is currently lifting {weight} lbs
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label>Weight</Label>
                            <Input type="number" placeholder="Enter weight in lbs" value={newWeight} onChange={(e) => setNewWeight(e.target.value)} required />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button type="submit" onClick={handleSubmit}>
                                Update
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
