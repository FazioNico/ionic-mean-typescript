# Ionic MEAN Stack Typescript
MEIN Stack - The MEAN Stack with Ionic &amp; Typescript

## Overview
MEIN Stack is a TypeScript Full Stack MongoDB + ExpressJS + Angular2 + NodeJS with Ionic 2 Framework to provide multi platform application.

## Prerequisites
- NVM - [Download](https://github.com/creationix/nvm) & Install Node Version Manage
- NodeJS 7 - Download & Install Node.js and the npm package manager with NVM `$ nvm install node 7`.
- MongoDB - [Download](https://www.mongodb.com) & Install MongoDB, and make sure it's running on the default port (27017).
- [Typescript](https://www.npmjs.com/package/typescript) Latest stable version install in Global `$ npm install -g typescript`
- [Nodemon](https://nodemon.io/) Latest stable version install in Global `$ npm install -g nodemon`
- [Ionic 2](https://ionicframework.com/) & [Cordova](https://cordova.apache.org/) - Latest stable version install in Global `$ npm install -g ionic cordova`
- And you should also have git installed to a better working flow.

## Quick Start
- run mongodb by open CLI from `./mongodb/bin` folder and run `$ ./mongod --dbpath ../data/db`
- open this project in your IDE and install all node_modules from IDE CLI `$ nvm use 7`, `$ npm install` and run server with `$ npm run dev`
- if you've trouble, try the manual start

## Manual Start
- open CLI from `./mongodb/bin` folder and run`$ ./mongod --dbpath ../data/db`
- open this project in your IDE and install all node_modules from IDE CLI `$ nvm use 7` and `$ npm install`
- now run Node Server from IDE CLI `$ ntsc server.ts -w`
- Typescript=> if trouble withtypes definition, use `$ npm install @types/{{TYPE_MODULE}} --save-dev
` for each module needed *(CAREFUL: to not install es6 @types => do not install cause it mek trouble with ionic build script. If you've a issue, pull request.)*
- and then open new IDE CLI and run `$ nodemon  --watch server.js`
- now again open new IDE CLI window and final run `$ nvm use 7` and `$ ionic serve` for building application
- you'r now ready to start to work ;)


## Start Production mode
- config mongodb URL
- open this project in your IDE and install all node_modules from IDE CLI `$ nvm use 7`, `$ npm install` and run server with `$ npm run prod`
- if you've trouble, try the manual start with `$ npm run server-prod` to replace `$ nodemon  --watch server.js` and remode `-w` from `$ ntsc server.ts -w`.

## Server API End Points
- index endpoints: `http://localhost:8080/api/todos` & Request Method `$_GET` and `$_POST`
- item endpoints: `http://localhost:8080/api/todos/:id` & Request Method `$_GET` and `$_POST`with $params `{ _id: NUMBER_ID }`

## About author
Hi, i'm a Front-end developper living in Geneva Switzerland and i build hybrid mobile & web applications for almost 15 years. You can follow me on Twitter @FazioNico or checkout my own website http://nicolasfazio.ch
