import { Button } from '@/components/ui/button'

export default function settings() {
    return (
        <div className="flex h-full w-full flex-col">
            <div className="flex flex-col gap-8 px-8 py-4">
                <div className="flex w-full flex-col gap-8">
                    <div className="flex justify-end">
                        <a href="/" className="w-20">
                            <Button variant="destructive">Logout</Button>
                        </a>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="font-medium">Change name</label>
                        <input type="text" className="rounded border px-3 py-2" placeholder="Your name" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="font-medium">Email</label>
                        <input type="email" className="rounded border px-3 py-2" placeholder="Your email" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="font-medium">Change Password</label>
                        <input type="password" className="rounded border px-3 py-2" placeholder="New password" />
                    </div>
                </div>
            </div>
        </div>
    )
}
