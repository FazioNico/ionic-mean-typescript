/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   20-12-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 20-12-2016
*/

import * as mongodb from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';
// const MONGODB_URI = 'mongodb://localhost:27017/test';

export class DbService{

  static mongoClient:any;
  static ObjectID:any;
  static data:any;

  constructor(){
  }

  static connect(){

    // Set mongo config
    DbService.mongoClient = mongodb.MongoClient;
    DbService.ObjectID = mongodb.ObjectID; // Used in API endpoints

    return new Promise((resolve, reject) =>{
          // Initialize database connection and then start the server.
          DbService.mongoClient.connect(MONGODB_URI, (err, database)=> {
            if (err) {
              console.log('Error mongoClient.connect() -> ', err)
              //process.exit(1);
              reject(err)
            }
            else {
              DbService.data = database; // Our database object from mLab
              console.log("Database connection ready"! );
              resolve(DbService.data)
            }
          });
      });
  }
}
