# Dialog Actions in Amazon Lex

This project will help you understand Dialog Actions in Amazon Lex V2.

## Prerequisites

Amplify : Install and configure the Amplify CLI (refer : https://docs.amplify.aws/start/getting-started/installation/q/integration/js/)

## Chatbot Conversation Flow

![Chatbot Conversation Flow](misc/chot-flow.png?raw=true)

## Architecture

![Architecture](misc/architecture.png?raw=true)

## Lex : Create Bot

### Import Bot

(AWS console) Amazon Lex -> Bots -> Action -> Import :

    Bot name : LexDialogAction-Bot
    Input file : Resource/BlogBot-3-YTZOBUF72Q-LexJson.zip
    IAM permissions : Create a role with basic Amazon Lex permissions
    COPPA : No

### Build Bot

(AWS console) Lex -> Bots -> LexDialogAction-Bot -> Draft Version -> All languages -> Language: English (US) : Build

Lex -> Bots -> LexDialogAction-Bot -> Draft Version -> All languages -> Language: Korean (KR) : Build

### Create Version

(AWS console) Lex -> Bots -> LexDialogAction-Bot -> Versions -> Create version : Create

Lex -> Bots -> LexDialogAction-Bot -> Aliases > Create alias : Create

    Alias name : prod
    Associate with a version : Version 1

## AWS Appsync & Amazon DynamoDB

### Build api and database using amplify

refer : https://docs.amplify.aws/start/getting-started/setup/q/integration/js/#initialize-a-new-backend

    mkdir makeapi && cd makeapi
    amplify init

When you initialize Amplify you'll be prompted for some information about the app :

    Project information
    | Name: makeApi
    | Environment: dev
    | Default editor: Visual Studio Code
    | App type: javascript
    | Javascript framework: none
    | Source Directory Path: src
    | Distribution Directory Path: dist
    | Build Command: npm run-script build
    | Start Command: npm run-script start


refer : https://docs.amplify.aws/start/getting-started/data-model/q/integration/js/

    amplify add api

Accept the default values which are highlighted below:

    ? Select from one of the below mentioned services: GraphQL
    ? Here is the GraphQL API that we will create. Select a setting to edit or continue Continue
    ? Choose a schema template: Single object with fields (e.g., “Todo” with ID, name, description)
    ✔ Do you want to edit the schema now? (Y/n) · yes
    ? Choose your default editor: Visual Studio Code

The CLI should open this GraphQL schema in your text editor. Edit your schema at schema.graphql

    # This "input" configures a global authorization rule to enable public access to
    # all models in this schema. Learn more about authorization rules here: https://docs.amplify.aws/cli/graphql/authorization-rules
    input AMPLIFY { globalAuthRule: AuthRule = { allow: public } } # FOR TESTING ONLY!

    type HotelResevation @model {
      id: ID!
      customerName: String!
        @index(name: "ByCustomerName", queryField: "ByCustomerName")
      customerPhoneNumber: String
      city: String
      hotelName: String
    }

Push our updated configuration to the cloud.

    amplify push

When you run amplify push, you will be presented with the option to have all the GraphQL operations found in your schema generated for you in code.

    ? Do you want to generate code for your newly created GraphQL API Yes
    ? Choose the code generation language target javascript
    ? Enter the file name pattern of graphql queries, mutations and subscriptions src/graphql/**/*.js
    ? Do you want to generate/update all possible GraphQL operations - queries, mutations and subscriptions Yes
    ? Enter maximum statement depth [increase from default if your schema is deeply nested] 2

### Insert sample data

(AWS console) AWS Appsync -> makeapi-dev -> Query :
In the AWS AppSync console choose the Queries tab on the left hand side. The pane on the right side enables you to click through the operations, including queries, mutations, and subscriptions that your schema has exposed. Choose the Mutation node to see a mutation. You can add a new HotelResevation information to it . Use this to add something to your database with GraphQL.

copy the following into the query editor and then choose Run:

     mutation MyMutation {
       createHotelResevation(input: {customerName: "Tom", city: "NewYork", customerPhoneNumber: "123456780", hotelName: "GrandHotel"}) {
         id
       }
     }

## AWS Lambda function

We will create the lambda function through cdk.

    git clone this project

open lib/lex_validate_lambda-stack.ts and replace environment to yours. You can find endpoint, apikey and region in makeapi/src/aws-exports.js.

     environment:{
       "aws_appsync_graphqlEndpoint": "YOUR APPSYNC ENDPOINT",
       "aws_appsync_apiKey": "YOUR APPSYNC APIKEY",
       "region": "YOUR REGION"
     },

### Install package

for lambda,

     cd lex-validate-lambda/
     npm install

for CDK

    cd ..
    npm install

### CDK Deploy

    cdk synth
    cdk bootstrap
    cdk deploy

## Lex & Lambda Integration

(AWS console) Lex -> Bots -> LexDialogAction-Bot -> Aliases -> prod -> Languages -> English -> Lambda function :

    Source : lex-validate-lambda
    Lambda function version or alias : $LATEST

(AWS console) Lex -> Bots -> LexDialogAction-Bot -> Aliases -> prod -> Languages -> Korean -> Lambda function :

    Source : lex-validate-lambda
    Lambda function version or alias : $LATEST

## Test

(AWS console) Lex -> Bots -> LexDialogAction-Bot -> Versions -> Version 1 -> All languages -> English : Test

## License

This library is licensed under the MIT-0 License. See the LICENSE file.
