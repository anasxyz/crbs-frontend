'use client';

import { signIn, fetchAuthSession } from 'aws-amplify/auth';
import { configureAmplify } from '@/lib/amplify-config';

import _button from '@/components/ui/_button';

export default function LoginPage() {
  const handleLogin = async () => {
    const email = "newuser@example.com";
    const password = "Password123!";

    try {
      // console.log("Attempting login...");

      const { isSignedIn } = await signIn({
        username: email.trim(),
        password: password.trim()
      });

      if (isSignedIn) {
        const session = await fetchAuthSession();
        const tokens = session.tokens;

        console.log("ID Token:", tokens?.idToken?.toString());
        console.log("Access Token:", tokens?.accessToken?.toString());
      }
    } catch (error: any) {
      console.error("Detailed Login Error:", error);
      alert(`Login failed: ${error.message || "Incorrect username or password"}`);
    }
  };

  const printTokens = async () => {
    const session = await fetchAuthSession();
    const tokens = session.tokens;

    console.log("ID Token:", tokens?.idToken?.toString());
    console.log("Access Token:", tokens?.accessToken?.toString());
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-xl font-bold">Log in</h1>
      <_button
        text="Login with Hardcoded Credentials"
        onClick={handleLogin}
      />
      <_button text="Print tokens" onClick={printTokens} />
    </div>
  );
}
