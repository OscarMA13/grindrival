import { SignUp } from '@clerk/nextjs'

export default function Page() {
    return (
        <div className="flex h-screen items-center justify-center">
            <SignUp forceRedirectUrl={process.env.CLERK_SIGN_UP_FORCE_REDIRECT_URL} />
        </div>
    )
}
