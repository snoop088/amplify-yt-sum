import type { Handler } from 'aws-lambda';

export const handler: Handler = async (event, context) => {
  // your function code goes here
  return {
    statusCode: 200,
    body: JSON.stringify({ message: `ello from Lambda!, ${event.arguments.name}` }),
  };
};