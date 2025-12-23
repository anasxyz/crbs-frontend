'use client';

import { useAuth } from '@/context/AuthProvider';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { signOut } from 'aws-amplify/auth';
import Link from 'next/link';

export default function ProfilePage() {
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  const menuItems = [
    { label: 'Account Information', sub: 'Manage your personal profile', href: '/profile/info' },
    { label: 'Manage My Bookings', sub: 'View and edit active reservations', href: '/profile/bookings' },
  ];

  return (
    <ProtectedRoute>
      <div className="max-w-5xl mx-auto py-12 px-6">
        <header className="mb-12">
          <Link
            href="/"
            className="text-[10px] uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition-opacity flex items-center mb-4"
          >
            ← Back to home
          </Link>
          <h1 className="text-3xl font-bold tracking-tighter pb-2">Profile</h1>
          <p className="text-xs uppercase tracking-[0.2em] opacity-50">
            System access for {user?.username || 'Authenticated User'}
          </p>
        </header>

        <div className="flex flex-col">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-center justify-between py-6 border border-white/30 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors px-6 rounded-xl mb-2"
            >
              <div className="space-y-1">
                <h2 className="text-lg font-medium tracking-tight group-hover:translate-x-1 transition-transform uppercase">
                  {item.label}
                </h2>
                <p className="text-[10px] uppercase tracking-widest group-hover:translate-x-1 transition-transform opacity-40">
                  {item.sub}
                </p>
              </div>
              <span className="text-xl opacity-0 group-hover:opacity-100 transition-opacity pr-2">→</span>
            </Link>
          ))}

          <button
            onClick={handleLogout}
            className="group flex items-center justify-between py-6 border border-red-500/20 hover:bg-red-50 dark:hover:bg-red-500/5 transition-colors px-6 rounded-xl mb-2 text-left w-full cursor-pointer"
          >
            <div className="space-y-1">
              <h2 className="text-lg font-medium tracking-tight group-hover:translate-x-1 transition-transform uppercase text-red-500">
                Sign Out
              </h2>
              <p className="text-[10px] uppercase tracking-widest group-hover:translate-x-1 transition-transform text-red-500/60">
                Terminate current session
              </p>
            </div>
            <span className="text-xl opacity-0 group-hover:opacity-100 transition-opacity pr-2 text-red-500">→</span>
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
}
