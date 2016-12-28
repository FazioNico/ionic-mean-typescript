<img src="https://live.zoomdata.com/zoomdata/service/connection/types/icon/MONGO_MONGO?v=$%7Btimestamp%7D" width="80">
<img src="http://apps.octoconsulting.com/images/expressIcon.png" width="80">
<img src="https://material.angularjs.org/latest/img/icons/angular-logo.svg" width="80">
<img src="http://code.runnable.com/images/provider-icons/icon-node.js.svg" width="80">
<img src="http://cloudoki.com/images/frameworks/ionic.png" width="80">

# Ionic MEAN/MEIN Stack Typescript
MEIN Stack - The MEAN Stack with Ionic &amp; Typescript

## Overview
MEIN Stack is a TypeScript Full Stack MongoDB + ExpressJS + Angular2 + NodeJS with Ionic 2 Framework to provide multi platform application.

It's a simple todo application exemple with server-side Users JWT authentification & using RxJS Observable on client-side.

Hop is help you to start your project on the right way.

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
- open this project in your IDE and install all node_modules from IDE CLI `$ nvm use 7.2`, `$ npm install`
- run project (server+client side) with `$ npm run dev`
- if you've trouble, try the manual start

## Manual Start
- open CLI from `./mongodb/bin` folder and run`$ ./mongod --dbpath ../data/db`
- open this project in your IDE and install all node_modules from IDE CLI `$ nvm use 7.2` and `$ npm install`
- now run Node Server from IDE CLI `$ tsc server.ts --moduleResolution node ./**/*.d.ts -w`
- Typescript=> if trouble withtypes definition, use `$ npm install @types/{{TYPE_MODULE}} --save-dev
` for each module needed *(CAREFUL: to not install es6 @types => do not install cause it mek trouble with ionic build script. If you've a issue, pull request.)*
- and then open new IDE CLI and run `$ nodemon ./server.js --ignore src/ --ignore www/ --ignore .tmp/`
- now again open new IDE CLI window and final run `$ nvm use 7.2` and `$ ionic serve` for building application
- you'r now ready to start to work ;)


## Start Production mode
- config mongodb URL & all providers URL Endpoints on client side
- open this project in your IDE and install all node_modules from IDE CLI `$ nvm use 7.2`, `$ npm install` and run server with `$ npm run prod`
- if you've trouble, try the manual start without `$ nodemon  --watch server.js` and remove `-w` from `$ ntsc server.ts -w`.


## Server REST API Endpoints

````
TODOS Endpoints

  path: http://localhost:8080/todos
  autenticate: false
  methode: $_GET / $_POST

  path: http://localhost:8080/todos/:id
  autenticate: false
  methode: $_GET / $_POST / $_DELETE


AUTH Endpoints

  path: http://localhost:8080/auth
  autenticate: false
  methode: $_POST

  path: http://localhost:8080/isauth
  autenticate: false/true
  methode: $_GET

  path: http://localhost:8080/signup
  autenticate: false
  methode: $_POST


USERS Endpoints

  path: http://localhost:8080/users
  autenticate: true
  methode: $_GET


  path: http://localhost:8080/users/:id
  autenticate: true
  methode: $_GET

````


## Deploy Application
Deploy runing task

### Github (Front-end)
- config all providers url endpoints on client side
- open this project in your IDE and install all node_modules from IDE CLI `$ nvm use 7.2`, `$ npm install` and run server with `$ npm run delpoy` this will push `./www` folder on your Github gh-pages branch repository

### Heroku (Back-end)
*coming soon...*

### IOS (Front-end)
- config all providers url endpoints on client side
- open this project in your IDE and install all node_modules from IDE CLI `$ nvm use 7.2`, `$ npm install` and run server with `$ npm ionic build ios` to build xCode Files
- publish on Itunes Connect

## About author
Hi, i'm a Front-end developper living in Geneva Switzerland and i build hybrid mobile & web applications for almost 15 years. You can follow me on Twitter @FazioNico or checkout my own website http://nicolasfazio.ch
