import { Amplify } from 'aws-amplify';

const userPoolId = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID;
const userPoolClientId = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID;

if (!userPoolId || !userPoolClientId) {
  throw new Error('Missing Cognito config');
}

export const configureAmplify = () => {
  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId,
        userPoolClientId: userPoolClientId,
      }
    }
  }, { ssr: true });
};
