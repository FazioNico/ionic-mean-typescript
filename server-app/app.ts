/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   15-12-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 15-12-2016
*/

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as mongodb from 'mongodb';

//const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';
const MONGODB_URI = 'mongodb://localhost:27017/test';

export class Server{

  app:any;
  mongoClient:any;
  ObjectID:any;
  db:any;  // We'll initialize connection below

  constructor(){
    // Set mongo config
    this.mongoClient = mongodb.MongoClient;
    this.ObjectID = mongodb.ObjectID; // Used in API endpoints
    this.app = express() //create expressjs application
    this.config() //configure application
    this.routes() //configure routes
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
    //let routes = new Routes(this.app,this.db,this.ObjectID);
    /*
    * Endpoint --> "/api/todos"
    */
    this.app.get("/api/todos", (req, res)=> {
      this.db.collection("todos").find({}).toArray((err, docs)=> {
        if (err) {
          this.handleError(res, err.message, "Failed to get todos");
        } else {
          this.reader(res.status(201),docs)
        }
      });
    });
    // POST: create a new todo
    this.app.post("/api/todos", (req, res)=> {
      let newTodo = {
        description: req.body.description,
        isComplete: false
      }
      this.db.collection("todos").insertOne(newTodo, (err, doc)=> {
        if (err) {
          this.handleError(res, err.message, "Failed to add todo");
        } else {
          //res.status(201).json(doc.ops[0]);
          this.reader(res.status(201) ,doc)
        }
      });
    });
    /*
     *  Endpoint "/api/todos/:id"
     */
     // GET: retrieve a todo by id -- Note, not used on front-end
     this.app.get("/api/todos/:id", (req, res)=> {
       this.db.collection("todos").findOne({ _id: new this.ObjectID(req.params.id) }, (err, doc)=> {
         if (err) {
           this.handleError(res, err.message, "Failed to get todo by _id");
         } else {
           res.status(200).json(doc);
         }
       });
     });
     // PUT: update a todo by id
     this.app.put("/api/todos/:id", (req, res)=> {
       let updateTodo = req.body;
       delete updateTodo._id;

       this.db.collection("todos").updateOne({_id: new this.ObjectID(req.params.id)}, updateTodo, (err, doc)=> {
         if (err) {
           this.handleError(res, err.message, "Failed to update todo");
         } else {
           res.status(204).end();
         }
       });
     });
     // DELETE: delete a todo by id
     this.app.delete("/api/todos/:id", (req, res)=> {
       this.db.collection("todos").deleteOne({_id: new this.ObjectID(req.params.id)}, (err, result)=> {
         if (err) {
           this.handleError(res, err.message, "Failed to delete todo");
         } else {
           res.status(204).end();
         }
       });
     });
  }

  reader(resStatus:any,data:any):void{
    resStatus.json(data);
  }

  handleError(res:any, reason:any, message:string, code:string='500'):void {
    console.log("API Error: " + reason);
    res.status(code).json({"Error": message});
  }

  bootstrap(){
    // Initialize database connection and then start the server.
    this.mongoClient.connect(MONGODB_URI, (err, database)=> {
      if (err) {
        console.log('Error mongoClient.connect() -> ', err)
      /*
        // Dont've types fro $process
        process.exit(1);
      */
      process.exit(1);
      }
      this.db = database; // Our database object from mLab
      console.log("Database connection ready");
      // Initialize the app.
      this.app.listen(this.app.get('port'), ()=> {
        console.log("You're a wizard, Harry. I'm a what? Yes, a wizard, on port", this.app.get('port'));
      });
    });
  }
}
