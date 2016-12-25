/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   21-12-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 24-12-2016
*/

import * as mongoose from 'mongoose';
import { User, IUserModel } from './user.model';

const toObjectId = (_id: string): mongoose.Types.ObjectId =>{
    return mongoose.Types.ObjectId.createFromHexString(_id);
}

export const userController = {
	// setup : (req,res) =>{
  //
	// 	(new User(<IUserModel>req.body))
  //   // create a sample user
  //   var nick = <IUserModel>new User({
  //     name: 'Nick Cerminara',
  //     password: 'password',
  //     admin: true
  //   });
  //   nick.save((err, doc:IUserModel) => {
	// 		if(err) return console.log(err);
  //     console.log('User saved successfully');
  //     res.json({ success: true });
	// 	})
	// },
  getAll : (req,res) => {
		User.find((err, docs:IUserModel[]) => {
			if(err) return console.log(err);
			res.json(docs);
		})
	},
}
