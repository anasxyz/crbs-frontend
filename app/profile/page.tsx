'use client';

import { useAuth } from '@/context/AuthProvider';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { signOut } from 'aws-amplify/auth';
import _navbar from '@/components/ui/_navbar';

export default function ProfilePage() {
  const { user, isLoading } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-2xl mx-auto mt-20 px-8">
        <header className="mb-12">
          <h1 className="text-3xl font-bold tracking-tighter mb-2">Account</h1>
          <p className="text-sm uppercase tracking-widest opacity-50">Manage your settings and bookings</p>
        </header>

        <section className="space-y-10">
          {/* User Info Section */}
          <div className="border-t pt-8">
            <h2 className="text-xs uppercase tracking-[0.2em] opacity-40 mb-4 font-semibold">User Details</h2>
            <div className="space-y-1">
              <p className="text-lg font-medium">{user?.username}</p>
              <p className="text-sm opacity-60">Member since 2025</p>
            </div>
          </div>

          {/* Actions Section */}
          <div className="border-t pt-8">
            <h2 className="text-xs uppercase tracking-[0.2em] opacity-40 mb-4 font-semibold">Security</h2>
            <button
              onClick={handleLogout}
              className="text-sm text-red-500 hover:text-red-600 transition-colors uppercase tracking-widest font-medium"
            >
              Sign out of system
            </button>
          </div>
        </section>
      </div>
    </ProtectedRoute>
  );
}
