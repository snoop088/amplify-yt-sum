import { defineFunction } from '@aws-amplify/backend';
import dotenv from 'dotenv';

dotenv.config();

export const invokeApi = defineFunction({
  // optionally specify a name for the Function (defaults to directory name)
  name: 'say-hello',
  // optionally specify a path to your handler (defaults to "./handler.ts")
  entry: './handler.ts',
  // optionally specify environment variables (defaults to {})
  timeoutSeconds: 30,
  environment: {
    FUNC_NAME: process.env.INVOKE_FUNCTION?.split(':').at(-1) ?? '',
  },
});
