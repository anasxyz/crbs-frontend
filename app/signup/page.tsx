'use client';

import { signUp } from 'aws-amplify/auth';

import _button from '@/components/ui/_button';

export default function SignUpPage() {
  const testEmail = "anas@example.com";
  const testPassword = "Password123!";
  const testUsername = "anas";

  const handleSignUp = async () => {
    try {
      await signUp({
        username: testEmail,
        password: testPassword,
        options: { 
          userAttributes: { 
            email: testEmail,
            preferred_username: testUsername
          } 
        }
      });
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="p-10">
      <_button text="Instant Sign Up" onClick={handleSignUp} />
    </div>
  );
}
