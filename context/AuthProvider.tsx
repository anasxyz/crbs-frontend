'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser, fetchUserAttributes, AuthUser } from 'aws-amplify/auth';
import { Hub } from 'aws-amplify/utils';
import { AuthContextType } from '@/types/auth';

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const checkUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);

      const attributes = await fetchUserAttributes();
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUser();

    const stopListening = Hub.listen('auth', ({ payload }) => {
      switch (payload.event) {
        case 'signedIn':
          checkUser();
          break;
        case 'signedOut':
          setUser(null);
          break;
        case 'tokenRefresh':
          console.log('Tokens refreshed successfully');
          break;
        case 'tokenRefresh_failure':
          setUser(null);
          break;
      }
    });

    return () => stopListening();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading: loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
