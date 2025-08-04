import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function rank() {
    return (
        <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20">
            <h1>different types of rank</h1>
            <Button variant="default">
                {' '}
                <Link href="/dashboard">Get Started</Link>
            </Button>
        </div>
    )
}
