import { defineFunction } from '@aws-amplify/backend';

export const invokeApi = defineFunction({
  // optionally specify a name for the Function (defaults to directory name)
  name: 'process-model-ouput',
  // optionally specify a path to your handler (defaults to "./handler.ts")
  entry: './handler.ts',
  // optionally specify environment variables (defaults to {})
  timeoutSeconds: 10,
});
  
