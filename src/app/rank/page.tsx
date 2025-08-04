import { CommandDialogDemo } from '@/components/combo-box'
import RankCards from '@/components/rank-cards'
import Topbar from '@/components/top-bar'

export interface Workout {
    name: string
    rank: string
    description: string
    weight?: string
}

const typesofworkouts: Workout[] = [
    { name: 'Chest', rank: 'platinum', description: 'You are currently ranked Platinum in Chest.', weight: '100' },
    { name: 'Back', rank: 'gold', description: 'You are currently ranked Gold in Back.', weight: '90' },
    { name: 'Legs', rank: 'silver', description: 'You are currently ranked Silver in Legs.', weight: '80' },
    { name: 'Shoulders', rank: 'gold', description: 'You are currently ranked Gold in Shoulders.', weight: '85' },
    { name: 'Arms', rank: 'silver', description: 'You are currently ranked Silver in Arms.', weight: '75' },
    { name: 'Abs', rank: 'gold', description: 'You are currently ranked Gold in Abs.', weight: '70' },
    { name: 'Cardio', rank: 'platinum', description: 'You are currently ranked Platinum in Cardio.', weight: '95' },
    { name: 'Glutes', rank: 'gold', description: 'You are currently ranked Gold in Glutes.', weight: '88' },
    { name: 'Calves', rank: 'bronze', description: 'You are currently ranked Bronze in Calves.', weight: '65' }
]

export default function rank() {
    return (
        <div className="flex h-full w-full flex-col">
            <Topbar />
            <div className="flex flex-col gap-8 px-8 py-4">
                <div className="flex w-full flex-col gap-8">
                    <div className="flex justify-end">
                        <CommandDialogDemo workouts={typesofworkouts} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {typesofworkouts.map((workout) => (
                            <RankCards
                                key={workout.name}
                                name={workout.name}
                                rank={workout.rank}
                                description={workout.description}
                                weight={workout.weight ?? ''}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
