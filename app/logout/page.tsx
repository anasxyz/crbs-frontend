'use client';

import { signOut } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';
import { configureAmplify } from '@/lib/amplify-config';

import _button from '@/components/ui/_button';

export default function LogoutPage() {
  const router = useRouter();

  async function handleSignOut() {
    try {
      await signOut();
      // redirect to login or home after clearing tokens
      router.push('/login');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  }

  return (
    <_button
      text="Sign Out"
      onClick={handleSignOut}
      className="bg-red-600 hover:bg-red-700"
    />
  );
}
