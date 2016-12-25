/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   21-12-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 24-12-2016
*/

import * as mongoose from 'mongoose';
// Import MongoDB config
import { dbHost, dbName } from "../../config";

/*
  Use TypeScript with mongoose models
  See https://github.com/Appsilon/styleguide/wiki/mongoose-typescript-models
  and https://gist.github.com/brennanMKE/ee8ea002d305d4539ef6 for more info about
  Mongoose Interface & Generic Types declaraton.
*/

// Define MongoDB path url
const MONGODB_URI:string = process.env.MONGODB_URI || `${dbHost}/${dbName}`;

export const mongoDbConnect = ()=>{

	return new Promise((resolve,reject)=>{
			// Connect to MongoDB with Mongoose
			mongoose.connect(MONGODB_URI, (err) => {
				if (err) { reject("Error connecting to MongoDB!")}
			  else{  resolve("MongoDB Ready!"); }
			});
	})

}
