import { Button } from '@/components/ui/button'
import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs'
import Link from 'next/link'

export default function Home() {
    return (
        <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20">
            <h1 className="text-4xl font-bold">Welcome to GrindRival!</h1>

            <SignedOut>
                <div className="flex flex-col items-center gap-4">
                    <p className="text-muted-foreground text-lg">Sign in to start your fitness journey</p>
                    <SignInButton>
                        <Button variant="default" size="lg">
                            Get Started
                        </Button>
                    </SignInButton>
                </div>
            </SignedOut>

            <SignedIn>
                <div className="flex flex-col items-center gap-4">
                    <p className="text-muted-foreground text-lg">Welcome back! Ready to continue your grind?</p>
                    <Button variant="default" size="lg" asChild>
                        <Link href="/workouts">Go to Workouts</Link>
                    </Button>
                </div>
            </SignedIn>
        </div>
    )
}
