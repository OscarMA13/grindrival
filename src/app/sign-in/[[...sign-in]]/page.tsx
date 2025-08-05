import { SignIn } from '@clerk/nextjs'

export default function Page() {
    return (
        <div className="flex h-screen items-center justify-center bg-gray-900">
            <SignIn forceRedirectUrl={process.env.CLERK_SIGN_IN_FORCE_REDIRECT_URL} fallbackRedirectUrl={process.env.CLERK_SIGN_IN_FALLBACK_REDIRECT_URL} />
        </div>
    )
}
