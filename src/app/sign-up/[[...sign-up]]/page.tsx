import { SignUp } from '@clerk/nextjs'

export default function Page() {
    return (
        <div className="flex h-screen items-center justify-center bg-gray-900">
            <SignUp forceRedirectUrl={process.env.CLERK_SIGN_UP_FORCE_REDIRECT_URL} fallbackRedirectUrl={process.env.CLERK_SIGN_UP_FALLBACK_REDIRECT_URL} />
        </div>
    )
}
