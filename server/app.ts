/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   21-12-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 22-12-2016
*/

/// <reference path="./@types/index.d.ts" />

import * as express from 'express';
import * as http  from "http";
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import { api }  from "./modules/api";
import { DataBase }  from "./modules/database";

export class Server{

  private app:express.Application;
  private server:http.Server;
  private root:string;
  private port:number|string|boolean;

  constructor(){
    this.app = express();
    this.server = http.createServer(this.app);
    this.config()
    this.dbConnect()
    this.route()
  }

  private config():void{
    this.root = 'www'
    this.port = this.normalizePort(process.env.PORT || 8080);
    this.app
    	.use(express.static(this.root))
    	.use(bodyParser.urlencoded({extended: true}))
    	.use(bodyParser.json())
      .use(cors())
      .use((err:any, req: express.Request, res: express.Response, next: express.NextFunction)=> {
        let error = new Error("Not Found");
        err.status = 404;
        next(err);
      });
  }

  private dbConnect(){
    DataBase.connect()
  }

  private route():void{
    this.app
      .get('/todos', api.getItems)
    	.get('/todos/:id', api.getItem)
      .post('/todos', api.addItem )
    	.put('/todos/:id', api.updateItem )
    	.delete('/todos/:id', api.deleteItem )
      // DEFAULT 404 ERROR PAGES
      .get('*', (req, res)=>{
         res.status(404).json([{error: 'ERROR: 404 PAGES NOT FOUND'}]);
       });
  }

  onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') throw error;
    let bind = (typeof this.port === 'string') ? 'Pipe ' + this.port : 'Port ' + this.port;
    switch(error.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  normalizePort(val: number|string): number|string|boolean {
    let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
    if (isNaN(port)) return val;
    else if (port >= 0) return port;
    else return false;
  }

  bootstrap():void{
    this.server.on('error', this.onError);
    this.server.listen(this.port, ()=>{
    	console.log("Listnening on port " + this.port)
    });
  }

}
