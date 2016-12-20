/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   15-12-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 17-12-2016
*/

/// <reference path="./server-types/index.d.ts" />

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as mongodb from 'mongodb';
import {Routes} from "./routes/routes";
import {DbService} from './db-config'

export class Server{

  app:any;
  db:any;  // We'll initialize connection below

  constructor(){
    this.app = express() //create expressjs application
    this.config() //configure application
    // connect to db
    DbService.connect()
      .then(()=>{
        this.db = DbService.data
        this.routes() //configure routes
      })
      .catch(err =>{
        this.catchDbError(err)
      })

  }

  config(){
    //mount json form parser
    this.app.use(bodyParser.json());
    //query string parser
    this.app.use(bodyParser.json());
    //this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.set('port', process.env.PORT || 8080);
    //this.app.set('port', 8080);
    this.app.use(cors()); // CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
    this.app.use(express.static("www")); // Our Ionic app build is in the www folder (kept up-to-date by the Ionic CLI using 'ionic serve')
    // // catch 404 and forward to error handler
    this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction)=> {
      let error = new Error("Not Found");
      err.status = 404;
      next(err);
    });
  }

  routes(){
    if(this.db){
      Routes.loadRoute(this.app, this.db, DbService.ObjectID)
    }
    else {
       this.app.get('*', (req, res)=>{
         this.catchDbError(res);
         this.reader(res.status(404) ,'ERROR: 404 PAGES NOT FOUND')
       });
    }
    // DEFAULT 404 ERROR PAGES
     this.app.get('*', (req, res)=>{
       this.catchDbError(res);
       this.reader(res.status(404) ,'ERROR: 404 PAGES NOT FOUND')
     });
  }

  catchDbError(res){
    if(!this.db){
      this.handleError(res, 'MongoDB not connect', "MongoDB not connect: Failed to get data", '404');
      return false
    }
  }

  handleError(res:any, reason:any, message:string, code:string='500'):void {
    console.log("API Error: " + reason);
    res.status(code).json({"Error": message});
  }

  reader(resStatus:any,data:any):void{
    resStatus.json(data);
  }

  bootstrap(){
    // Initialize the app.
    this.app.listen(this.app.get('port'), ()=> {
      console.log("You're a wizard, Harry. I'm a what? Yes, a wizard, on port", this.app.get('port'));
    });
  }
}
