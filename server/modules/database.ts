import { mongoDbConnect } from "./mongodb/mongo";

export class DataBase{

  static db:any

  constructor(){
  }

  static connect(){
    this.db = mongoDbConnect();
  }
}
