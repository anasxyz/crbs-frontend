'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthProvider';
import { UserService } from '@/lib/apiServices';
import { User } from '@/types/api';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import Link from 'next/link';
import _loader from '@/components/ui/_loader';

export default function AccountInfoPage() {
  const { user: authUser } = useAuth();
  const [dbUser, setDbUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!authUser?.userId) return;
      try {
        const res = await UserService.getProfile(authUser.userId);
        setDbUser(res.data);
      } catch (err) {
        console.error("Profile sync failed", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [authUser?.userId]);

  if (loading) return <_loader text="Syncing Profile..." />;

  const infoFields = [
    { label: 'Username', value: dbUser?.username, sub: 'Public facing identifier' },
    { label: 'Email', value: dbUser?.email, sub: 'Verified communication channel' },
    { label: 'Account Type', value: dbUser?.role, sub: 'Current system access level' },
    { label: 'User ID', value: dbUser?.userId, sub: 'Database primary key' },
  ];

  return (
    <ProtectedRoute>
      <div className="max-w-5xl mx-auto py-12 px-6">
        <header className="mb-12">
          <Link
            href="/profile"
            className="text-[10px] uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition-opacity flex items-center mb-4"
          >
            ← Back to profile
          </Link>
          <h1 className="text-3xl font-bold tracking-tighter pb-2">Account Information</h1>
          <p className="text-xs uppercase tracking-[0.2em] opacity-50">View your account details</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {infoFields.map((field, index) => (
            <div
              key={index}
              className="flex flex-col py-6 border border-white/30 dark:border-white/10 px-6 rounded-xl"
            >
              <label className="text-[10px] uppercase tracking-widest opacity-40 mb-1">
                {field.label}
              </label>
              <p className="text-lg font-medium tracking-tight uppercase truncate">
                {field.value || 'N/A'}
              </p>
              <p className="text-[10px] opacity-30 italic mt-1">
                {field.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
