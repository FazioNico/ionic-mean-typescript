/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   21-12-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 22-12-2016
*/

import * as mongoose from 'mongoose';
import { Todo } from './mongodb/mongo';
import { ITodoModel } from './mongodb/models/todo.model';

const toObjectId = (_id: string): mongoose.Types.ObjectId =>{
    return mongoose.Types.ObjectId.createFromHexString(_id);
}

export const api = {
	getItems : (req,res) => {
		Todo.find((err, docs) => {
			if(err) return console.log(err);
			res.json(docs);
		})
	},
	getItem : (req,res) => {
		Todo.findById(toObjectId(req.params.id), (err, doc) => {
			if(err) return console.log(err);
			res.json(doc);
		})
	},
	deleteItem : (req,res) => {
		Todo.findByIdAndRemove(toObjectId(req.params.id),  (err, doc) => {
			if(err) return console.log(err);
			res.json(doc);
		})
	},
	addItem : (req,res) =>{

		(new Todo(<ITodoModel>req.body)).save((err, doc) => {
			if(err) return console.log(err);
			res.json(doc);
		})
	},
	updateItem : (req,res) => {
		let updateTodo = <ITodoModel>req.body;
		delete updateTodo._id;
		Todo.update({_id: toObjectId(req.params.id)}, updateTodo, (err, doc:any)=>{
			if(err) return console.log(err);
			res.json(doc);
		})
	},

}
