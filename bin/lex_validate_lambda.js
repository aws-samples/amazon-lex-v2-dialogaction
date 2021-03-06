#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cdk = require("@aws-cdk/core");
const lex_validate_lambda_stack_1 = require("../lib/lex_validate_lambda-stack");
const app = new cdk.App();
new lex_validate_lambda_stack_1.LexValidateLambdaStack(app, 'LexValidateLambdaStack');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGV4X3ZhbGlkYXRlX2xhbWJkYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxleF92YWxpZGF0ZV9sYW1iZGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EscUNBQXFDO0FBQ3JDLGdGQUEwRTtBQUUxRSxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUMxQixJQUFJLGtEQUFzQixDQUFDLEdBQUcsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiIyEvdXNyL2Jpbi9lbnYgbm9kZVxuaW1wb3J0ICogYXMgY2RrIGZyb20gJ0Bhd3MtY2RrL2NvcmUnO1xuaW1wb3J0IHsgTGV4VmFsaWRhdGVMYW1iZGFTdGFjayB9IGZyb20gJy4uL2xpYi9sZXhfdmFsaWRhdGVfbGFtYmRhLXN0YWNrJztcblxuY29uc3QgYXBwID0gbmV3IGNkay5BcHAoKTtcbm5ldyBMZXhWYWxpZGF0ZUxhbWJkYVN0YWNrKGFwcCwgJ0xleFZhbGlkYXRlTGFtYmRhU3RhY2snKTtcbiJdfQ==