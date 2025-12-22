'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'aws-amplify/auth';
import { useAuth } from '@/context/AuthProvider';
import _button from '@/components/ui/_button';

export default function LoginPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && user) router.push('/');
  }, [user, isLoading, router]);

  const handleLogin = async () => {
    if (!email || !password) return;
    setError('');
    setIsSubmitting(true);

    try {
      const { isSignedIn } = await signIn({
        username: email.trim(),
        password: password.trim()
      });
      if (isSignedIn) router.push('/');
    } catch (err: any) {
      setError(err.message || "Invalid credentials");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || user) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-8">
      <div className="w-full max-w-sm space-y-12">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter">Welcome back</h1>
          <p className="text-xs uppercase tracking-[0.2em] opacity-50">Enter your details to access system</p>
        </header>

        <div className="space-y-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest opacity-40 font-semibold ml-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-gray-200 dark:border-gray-800 py-3 px-1 focus:outline-none focus:border-black dark:focus:border-white transition-colors text-sm"
                placeholder="name@company.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest opacity-40 font-semibold ml-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-gray-200 dark:border-gray-800 py-3 px-1 focus:outline-none focus:border-black dark:focus:border-white transition-colors text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && <p className="text-[10px] text-red-500 uppercase tracking-wider text-center">{error}</p>}

          <div className="pt-4">
            {/* Added onClick and disabled state */}
            <_button
              text={isSubmitting ? "Processing..." : "Sign In"}
              className="w-full"
              onClick={handleLogin}
              disabled={isSubmitting}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
