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
    { name: 'Chest', rank: 'Top 10%', description: 'You are currently ranked in the top 10% of players.' },
    { name: 'Back', rank: 'Top 20%', description: 'You are currently ranked in the top 20% of players.' },
    { name: 'Legs', rank: 'Top 30%', description: 'You are currently ranked in the top 30% of players.' },
    { name: 'Shoulders', rank: 'Top 15%', description: 'You are currently ranked in the top 15% of players.' },
    { name: 'Arms', rank: 'Top 25%', description: 'You are currently ranked in the top 25% of players.' },
    { name: 'Abs', rank: 'Top 18%', description: 'You are currently ranked in the top 18% of players.' },
    { name: 'Cardio', rank: 'Top 12%', description: 'You are currently ranked in the top 12% of players.' },
    { name: 'Glutes', rank: 'Top 22%', description: 'You are currently ranked in the top 22% of players.' },
    { name: 'Calves', rank: 'Top 28%', description: 'You are currently ranked in the top 28% of players.' }
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
                            <RankCards key={workout.name} name={workout.name} rank={workout.rank} description={workout.description} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
