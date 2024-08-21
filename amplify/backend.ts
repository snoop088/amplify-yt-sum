import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource.js';
import { data } from './data/resource.js';

import { invokeApi } from './functions/invoke-api/resource';

import { PolicyStatement, ArnPrincipal } from 'aws-cdk-lib/aws-iam';

import * as iam from "aws-cdk-lib/aws-iam";

import dotenv from 'dotenv';
dotenv.config();

const invokeFunction = process.env.INVOKE_FUNCTION
const dbUpdateFunction = process.env.DB_UPDATE_FUNCTION

const backend = defineBackend({
  auth,
  data,
  invokeApi,

  // Add other resources here, such as functions or containers
});

const inkoveLambdaDef = backend.invokeApi.resources.lambda

inkoveLambdaDef.addToRolePolicy(new PolicyStatement(
  {
    effect: iam.Effect.ALLOW,
    actions: ["lambda:InvokeFunction"],
    resources: [invokeFunction ?? '']
  }
))

// const dynamoNews = backend.data.resources.tables['News']
// dynamoNews.grantReadWriteData({grantPrincipal: new ArnPrincipal(dbUpdateFunction ?? '') })

// const eventSource = new DynamoEventSource(backend.data.resources.tables["News"], {
//   startingPosition: StartingPosition.LATEST,
// });


backend.data.resources.graphqlApi.grantMutation({grantPrincipal: new ArnPrincipal(dbUpdateFunction ?? '')})