import type { Handler } from 'aws-lambda';
export const handler: Handler = async (event, context) => {

  const output = event.body.generation;
  
  // your function code goes here
  
};