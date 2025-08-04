'use client'
import Topbar from '@/components/top-bar'
import { cn } from '@/lib/utils'
import { ClerkProvider } from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import { usePathname } from 'next/navigation'
import './globals.css'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin']
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin']
})

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    const pathname = usePathname()
    return (
        <ClerkProvider afterSignOutUrl="/">
            <html lang="en">
                <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                    <header className={cn(pathname === '/' ? 'hidden' : 'w-full')}>
                        <Topbar />
                    </header>
                    {children}
                </body>
            </html>
        </ClerkProvider>
    )
}
