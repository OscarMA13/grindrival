'use client'

import { Button } from '@/components/ui/button'
import { useStoreUserEffect } from '@/useStoreUserEffect'
import { SignInButton, SignUpButton } from '@clerk/clerk-react'
import { useRouter } from 'next/navigation'

function App() {
    const router = useRouter()
    const { isLoading, isAuthenticated } = useStoreUserEffect()
    return (
        <main>
            {isLoading ? (
                <>Loading...</>
            ) : !isAuthenticated ? (
                <div className="flex h-screen items-center justify-center gap-4">
                    <SignInButton>
                        <Button>Sign In</Button>
                    </SignInButton>

                    <SignUpButton>
                        <Button>Sign Up</Button>
                    </SignUpButton>
                </div>
            ) : (
                <div className="flex h-screen flex-col items-center justify-center gap-4">
                    <h1 className="text-2xl">Continue Your Journey</h1>
                    <Button onClick={() => router.push('/dashboard')}>Continue</Button>
                </div>
            )}
        </main>
    )
}

export default App
