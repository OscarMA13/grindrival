import { Button } from './ui/button'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'

export default function rankCards({ name, rank, description }: { name: string; rank: string; description: string }) {
    return (
        <Card className="h-full w-full">
            <CardHeader>
                <CardTitle>{name} Rank</CardTitle>
                <CardDescription>{description}</CardDescription>
                <CardAction></CardAction>
            </CardHeader>
            <CardContent>
                <p>Image will go here </p>
                <p>current weight: 7k : kg</p>
            </CardContent>
            <CardFooter>
                <Button>update wieght</Button>
            </CardFooter>
        </Card>
    )
}
