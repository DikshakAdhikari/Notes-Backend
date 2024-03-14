# Note Taking Application

**Introduction**  

This is an advanced Notes making app consists of all CRUD operations with secure authentication using JWT. Client implemented using Next.js, Typescript and Tailwind Css, Server implemented using Nest.js 

**Features**  

This application provides users with the following features  


- Authentication using **JWT Tokens and Passport.js**  
- Provide all CRUD operations in app
- Server is Highly opinionated. Follows the design paradigm of "convention over configuration".

## Frontend Deployment Steps at Vercel- 

- Go to vercel -> add new -> project
- Choose appropriate Github repository to deploy
- Locate the directory inside github that needs to deploy
- Give environment variables if used any
- Give your deployment project a unique name
- Now we're ready for our frontend deployment

## Backend Deployment Steps at AWS Lambda using CDK-

**Setting Up the Infrastructure with AWS CDK**

- In the lib/my-stack.ts file, begin with the core of your setup: the Lambda function.

```bash
  // LambdaNestStack in stack.ts
const apiNestHandlerFunction = new Function(this, "ApiNestHandler", {
  code: Code.fromAsset("api/dist"), 
  runtime: Runtime.NODEJS_18_X,
  handler: "main.handler",
  environment: {}, 
});
```

-Next to the main.ts file, create a new lambda.ts file. This file will be the entry point of our Lambda function.

```bash
// lambda.ts
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import serverlessExpress from '@vendia/serverless-express';
import { Context, Handler } from 'aws-lambda';
import express from 'express';

import { AppModule } from './app.module';

let cachedServer: Handler;

async function bootstrap() {
  if (!cachedServer) {
    const expressApp = express();
    const nestApp = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
    );

    nestApp.enableCors();

    await nestApp.init();

    cachedServer = serverlessExpress({ app: expressApp });
  }

  return cachedServer;
}

const handler = async (event: any, context: Context, callback: any) => {
  const server = await bootstrap();
  return server(event, context, callback);
};

module.exports.handler = handler;
```
- Let's start by creating a new webpack.config.js file in our API package. This file will define our Webpack configuration.

  ```bash
module.exports = function (options, webpack) {
  return {
    ...options,
    entry: ['./src/lambda.ts'],
    externals: [],
    output: {
      ...options.output,
      libraryTarget: 'commonjs2',
    },
  };
};
```

  



