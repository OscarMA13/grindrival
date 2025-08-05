'use client'

import { Button } from '@/components/ui/button'
import { useStoreUserEffect } from '@/useStoreUserEffect'
import { SignInButton, SignUpButton } from '@clerk/clerk-react'
import { useRouter } from 'next/navigation'

function App() {
    const router = useRouter()
    const { isLoading, isAuthenticated } = useStoreUserEffect()

    return (
        <main className="min-h-screen bg-gray-900">
            {isLoading ? (
                <div className="flex h-screen items-center justify-center">
                    <div className="text-xl text-white">Loading...</div>
                </div>
            ) : !isAuthenticated ? (
                <div className="flex h-screen items-center justify-center px-4">
                    <div className="w-full max-w-sm">
                        {/* Logo Section */}
                        <div className="mb-12 text-center">
                            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"></div>
                            </div>
                            <h1 className="text-xl font-semibold text-white">Grind Rivals</h1>
                        </div>

                        {/* Login Form */}
                        <div className="space-y-4">
                            <SignInButton>
                                <Button className="h-12 w-full border-0 bg-white/90 text-gray-800 backdrop-blur-sm hover:bg-white">Login</Button>
                            </SignInButton>

                            <SignUpButton>
                                <Button variant="outline" className="h-12 w-full border-white/30 bg-transparent text-white hover:bg-white/10">
                                    Sign Up
                                </Button>
                            </SignUpButton>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex h-screen flex-col items-center justify-center gap-4 text-white">
                    <h1 className="text-2xl font-semibold">Continue Your Journey</h1>
                    <Button onClick={() => router.push('/dashboard')} className="bg-white/90 text-gray-800 hover:bg-white">
                        Continue
                    </Button>
                </div>
            )}
        </main>
    )
}

export default App
