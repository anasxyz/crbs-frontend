import { Amplify } from 'aws-amplify';

export const configureAmplify = () => {
  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId: 'us-east-1_BbyvalMOb',
        userPoolClientId: '7783kecd24msmcls04vv1s86c0',
      }
    }
  }, { ssr: true });
};
