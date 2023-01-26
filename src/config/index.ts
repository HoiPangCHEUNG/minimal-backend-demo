import { AppConfig } from '../interfaces/config';

const getProcessEnv = (envName: string, defaultVal: string): string => {
  const env = process.env[envName];

  return env ? env : defaultVal;
};

export const appConfig: AppConfig = {
  fakeAPIEndpoint: getProcessEnv(
    'FAKE_API_END_POINT',
    'https://jsonplaceholder.typicode.com',
  ),
  serverPort: Number(getProcessEnv('SERVER_PORT', '3000')),
  timeout: Number(getProcessEnv('TIMEOUT', '100000')),
};
