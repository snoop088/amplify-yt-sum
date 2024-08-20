import type { Handler } from 'aws-lambda';
import { InvokeCommand, LambdaClient } from '@aws-sdk/client-lambda';

export const handler: Handler = async (event, context) => {

  const lambdaClient = new LambdaClient({ region: "us-east-1" });
  const params = {
    FunctionName: process.env.FUNC_NAME, // The name of your Lambda function
    Payload: JSON.stringify({
      "body": {
        "url": event.arguments.url
      }
    }), // The payload to send to the Lambda function
  };
  
  // Create and send the command
  const command = new InvokeCommand(params);
  try {
    const response = await lambdaClient.send(command);
  
    // Handle the response payload (if any)
    const responsePayload = JSON.parse(new TextDecoder("utf-8").decode(response.Payload));
    
    console.log("Response Payload:", responsePayload);
    return {
      statusCode: 200,
      body: JSON.stringify(responsePayload),
    };
  } catch (error) {
    console.error("Error invoking Lambda function:", error);
    return {
      statusCode: 500,
      error: JSON.stringify({ message: error as string }),
    };
  }
  // your function code goes here
  
};