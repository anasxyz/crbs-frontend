"use client";

import { useAuth } from "@/context/AuthProvider";
import Link from 'next/link';

export default function Navbar() {
  const { user, isLoading } = useAuth();

  return (
    <nav className="p-8 flex justify-between items-center max-w-5xl mx-auto">
      <Link href="/" className="hover:opacity-70 transition-opacity">
        <span className="font-bold tracking-tighter text-xl">CRBS</span>
      </Link>

      <div className="space-x-8 text-xs uppercase tracking-widest opacity-60 flex items-center">
        {isLoading ? (
          <div className="p-2">Loading...</div>
        ) : user ? (
          <>
            <Link href="/locations" className="hover:opacity-100 transition-opacity p-2">Browse locations</Link>
            <Link href="/profile" className="hover:opacity-100 transition-opacity p-2">Profile</Link>
          </>
        ) : (
          <Link href="/login" className="hover:opacity-100 transition-opacity p-2">Log in</Link>
        )}
      </div>
    </nav>
  );
}
