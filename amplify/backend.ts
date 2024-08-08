import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource.js';
import { data } from './data/resource.js';
import * as iam from "aws-cdk-lib/aws-iam"
import * as sns from "aws-cdk-lib/aws-sns"

import { invokeApi } from './functions/invoke-api/resource';

const backend = defineBackend({
  auth,
  data,
  invokeApi,
  // Add other resources here, such as functions or containers
});
const weeklyDigestLambda = backend.invokeApi.resources.lambda