'use client'

import { CreditCard, DumbbellIcon, SearchIcon, Settings, User } from 'lucide-react'
import * as React from 'react'

import { Workout } from '@/app/rank/page'
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from '@/components/ui/command'
import { Button } from './ui/button'

export function CommandDialogDemo({ workouts }: { workouts: Workout[] }) {
    const [open, setOpen] = React.useState(false)

    return (
        <>
            <Button variant="ghost" className="h-10 w-10 justify-end" onClick={() => setOpen(true)}>
                <SearchIcon />
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                        {workouts.slice(0, 3).map((workout) => (
                            <CommandItem key={workout.name}>
                                <DumbbellIcon />
                                <span>{workout.name}</span>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Menu Items">
                        <CommandItem>
                            <User />
                            <span>Workouts</span>
                            <CommandShortcut>⌘P</CommandShortcut>
                        </CommandItem>
                        <CommandItem>
                            <CreditCard />
                            <span>Rank</span>
                            <CommandShortcut>⌘B</CommandShortcut>
                        </CommandItem>
                        <CommandItem>
                            <Settings />
                            <span>Settings</span>
                            <CommandShortcut>⌘S</CommandShortcut>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    )
}
