import { SignIn } from '@clerk/nextjs'

export default function Page() {
    return (
        <div className="flex h-screen items-center justify-center">
            <SignIn forceRedirectUrl={process.env.CLERK_SIGN_IN_FORCE_REDIRECT_URL} />
        </div>
    )
}
