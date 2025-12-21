'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export default function TestPage() {
  return (
    <ProtectedRoute>
      <div>
      </div>
    </ProtectedRoute>
  );
}

