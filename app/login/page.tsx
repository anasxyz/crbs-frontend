'use client';

import { signIn, fetchAuthSession } from 'aws-amplify/auth';
import { configureAmplify } from '@/lib/amplify-config';

import _button from '@/components/_button';

configureAmplify();

export default function SimpleLoginPage() {
  const handleLogin = async () => {
    const email = "newuser@example.com";
    const password = "Password123!";

    try {
      console.log("Attempting login...");

      const { isSignedIn } = await signIn({
        username: email.trim(),
        password: password.trim()
      });

      if (isSignedIn) {
        const session = await fetchAuthSession();
        const tokens = session.tokens;

        console.log("Login Success!");
        console.log("ID Token (for API Gateway):", tokens?.idToken?.toString());
        console.log("Access Token:", tokens?.accessToken?.toString());

        alert("Logged in! Check console for tokens.");
      }
    } catch (error: any) {
      console.error("Detailed Login Error:", error);
      alert(`Login failed: ${error.message || "Incorrect username or password"}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-xl font-bold">Uni Project Auth</h1>
      <_button
        text="Login with Hardcoded Credentials"
        onClick={handleLogin}
      />
    </div>
  );
}
