#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { LexValidateLambdaStack } from '../lib/lex_validate_lambda-stack';

const app = new cdk.App();
new LexValidateLambdaStack(app, 'LexValidateLambdaStack');
