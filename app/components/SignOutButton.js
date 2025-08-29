'use client'

import Link from "next/link"
import clsx from "clsx"
import { usePathname } from "next/navigation"

export default function SignOutButton() {
    const pathname = usePathname()

    return (
        <Link
            href="/"
            className={clsx(
                "fixed bottom-4 right-4 cursor-pointer font-bold",
                pathname.startsWith("/auth") && "hidden"
            )}
        >
            Sign Out
        </Link>
    )
}
