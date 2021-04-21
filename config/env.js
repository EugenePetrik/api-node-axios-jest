import { cleanEnv, url } from 'envalid';

export const CONFIG = cleanEnv(process.env, {
  JSON_PLACEHOLDER_API: url({
    default: 'https://jsonplaceholder.typicode.com',
    desc: 'API URL to be tested',
  }),
});
