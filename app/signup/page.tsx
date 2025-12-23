'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signUp } from 'aws-amplify/auth';
import _button from '@/components/ui/_button';
import _loader from '@/components/ui/_loader';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignup = async () => {
    if (!email || !password || !username) return;
    setError('');
    setIsSubmitting(true);

    try {
      await signUp({
        username: email.trim(),
        password: password.trim(),
        options: {
          userAttributes: {
            email: email.trim(),
            preferred_username: username.trim(),
          }
        }
      });
      // Redirect to a confirmation code page or login
      router.push('/login');
    } catch (err: any) {
      setError(err.message || "Could not complete registration");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="max-w-5xl mx-auto py-12 px-6 min-h-[80vh] flex flex-col justify-center">
        <header className="mb-12 text-center">
          <h1 className="text-3xl font-bold tracking-tighter pb-2">Create Account</h1>
          <p className="text-xs uppercase tracking-[0.2em] opacity-50 text-center">
            Register your credentials in the system
          </p>
        </header>

        <div className="max-w-md mx-auto w-full space-y-2">
          {/* Username Input Card */}
          <div className="group flex flex-col py-4 border border-white/30 dark:border-white/10 px-6 rounded-xl transition-colors focus-within:border-black dark:focus-within:border-white">
            <label className="text-[10px] uppercase tracking-widest opacity-40 mb-1">Full Name</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-transparent outline-none text-lg font-medium tracking-tight"
              placeholder="John Doe"
            />
          </div>

          {/* Email Input Card */}
          <div className="group flex flex-col py-4 border border-white/30 dark:border-white/10 px-6 rounded-xl transition-colors focus-within:border-black dark:focus-within:border-white">
            <label className="text-[10px] uppercase tracking-widest opacity-40 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent outline-none text-lg font-medium tracking-tight"
              placeholder="name@company.com"
            />
          </div>

          {/* Password Input Card */}
          <div className="group flex flex-col py-4 border border-white/30 dark:border-white/10 px-6 rounded-xl transition-colors focus-within:border-black dark:focus-within:border-white">
            <label className="text-[10px] uppercase tracking-widest opacity-40 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent outline-none text-lg font-medium tracking-tight"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-[10px] text-red-500 uppercase tracking-[0.2em] pt-4 text-center">
              {error}
            </p>
          )}

          <div className="pt-8 space-y-4">
            <_button
              text="Register Account"
              className="w-full py-4 rounded-xl text-xs uppercase tracking-[0.2em]"
              onClick={handleSignup}
              disabled={isSubmitting}
            />

            <Link
              href="/login"
              className="group flex items-center justify-between py-4 border border-white/30 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors px-6 rounded-xl"
            >
              <div className="space-y-0.5">
                <p className="text-[10px] uppercase tracking-widest opacity-40 group-hover:translate-x-1 transition-transform">
                  Already registered?
                </p>
                <h2 className="text-sm font-medium tracking-tight group-hover:translate-x-1 transition-transform uppercase">
                  Back to Sign In
                </h2>
              </div>
              <span className="text-lg opacity-0 group-hover:opacity-100 transition-opacity pr-2">→</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
