import Link from "next/link";

import { SignedIn,SignedOut, UserButton } from "@clerk/nextjs";


export default function Navbar() {
    return(
    <nav className="bg-gray-900 text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          GameVault
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/explore" className="hover:text-gray-300">
            Explorer
          </Link>

          <SignedIn>
            <Link href="/dashboard" className="hover:text-gray-300">
              Ma Collection
            </Link>
            <UserButton />
          </SignedIn>

          <SignedOut>
            <Link href="/sign-in" className="hover:text-gray-300">
              Connexion
            </Link>
            <Link href="/sign-up" className="bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-700">
              Inscription
            </Link>
          </SignedOut>
        </div>
      </div>
    </nav>
    )
}