import { AuthUser } from 'aws-amplify/auth';

export interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
}
