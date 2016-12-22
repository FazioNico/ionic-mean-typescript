/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   21-12-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 22-12-2016
*/

import * as mongoose from 'mongoose';

// Import Mongoose Model & Schemas
import { ITodoModel } from './models/todo.model';
import { todoSchema } from './schemas/todo.schema';

/*
  Use TypeScript with mongoose models
  See https://github.com/Appsilon/styleguide/wiki/mongoose-typescript-models
  and https://gist.github.com/brennanMKE/ee8ea002d305d4539ef6 for more info about
  Mongoose Interface & Generic Types declaraton.
*/

// Define & export Mongoose Model
export const Todo = mongoose.model<ITodoModel>('todos', todoSchema);

// Connect to MongoDB with Mongoose
mongoose.connect('mongodb://localhost:27017/test', (err) => {
	if (err) {return console.error("Error connecting to MongoDB!");}
  else{ return console.error("MongoDB Ready!"); }
});
