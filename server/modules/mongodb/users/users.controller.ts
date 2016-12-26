/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   25-12-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 25-12-2016
*/

import * as mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';

import { User, IUserModel } from './user.model';
import {Authentication} from '../../authentication';
// Import secretTokenKey config
import { secretTokenKey } from "../../../config";

const toObjectId = (_id: string): mongoose.Types.ObjectId =>{
    return mongoose.Types.ObjectId.createFromHexString(_id);
}

export const userController = {
	setup : (req,res) =>{

		(new User(<IUserModel>req.body))
    // create a sample user
    var nick = <IUserModel>new User({
      email: 'aa@aa.ch',
      password: 'A123456',
      admin: true
    });
    nick.save((err, doc:IUserModel) => {
			if(err) return console.log(err);
      console.log('User saved successfully');
      res.json({ success: true });
		})
	},

	signup : (req,res) =>{
    console.log('req.body-> ', req.body);
		//(new User(<IUserModel>req.body))
    // check existe user in DB
    // before add new user
    // find the user
    User.findOne({email: req.body.email}, (err, user:IUserModel)=> {
      if (err) throw err;
      if (!user) {
        // No existing user found, create the new user
        // create user
        var newuser = <IUserModel>new User({
          email: req.body.email,
          password: req.body.password,
          admin: false
        });
        newuser.save((err, doc:IUserModel) => {
    			if(err) return console.log(err);
          console.log('User saved successfully');
          res.json({ success: true, message: 'User created successfully' });
    		})
      }
      else {
        // User alerady existe un DB
        res.json({ success: false, message: 'User already existe'});
      }
    });
	},
  isAuth: (req,res)=> {
    Authentication.checkAuthentication(req,  (isAuth: boolean|any): void =>{
      //console.log('looog-> ', doc)
      if (isAuth) {
        //console.log('isAuth-> ', isAuth.user._id, 'req.params.id-> ',  req.params.id)
        // the user has a proper token
        // Send request to database
    		User.findById(toObjectId(isAuth.user._id), (err, doc:IUserModel) => {
    			if(err) return console.log(err);
          if(doc === null){
            res.json({ success: false, message: 'isAuth failed. User not exist', user: isAuth.user});
            return console.log('isAuth failed. User not exist')
          }
          res.json(doc);
        })
      }
      else {
        res.json({ success: false, message: 'No user token finded'});
      }
    });
	},
  auth: (req,res)=> {
    // find the user
    User.findOne({email: req.body.email}, (err, user:IUserModel)=> {
      if (err) throw err;
      if (!user) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
      }
      else if (user) {
        // check if password matches
        if (user.password != req.body.password) {
          res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        }
        else {
          // if user is found and password is right
          // create a token
          var token = jwt.sign(user, secretTokenKey, {
            expiresIn: 86400000 // expires in 24 hours
          });
          // return the information including token as JSON
          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
          });
        }
      }
    });
  },
  getAll : (req,res) => {
		User.find((err, docs:IUserModel[]) => {
			if(err) return console.log(err);
      // remove password user from datas
      let docsReady = docs.map((user)=>{
        return {
          _id: user._id,
          email: user.email,
          admin: user.admin
        }
      })
			res.json(docsReady);
		})
	},
  getUser: (req,res) => {
    Authentication.checkAuthentication(req,  (isAuth: boolean|any): void =>{
      //console.log('looog-> ', doc)
      if (isAuth) {
        console.log('isAuth-> ', isAuth.user._id, 'req.params.id-> ',  req.params.id)
        // the user has a proper token & is the same of the req.params.id: let's call next
        if(isAuth.user._id === req.params.id){
          // Send request to database
      		User.findById(toObjectId(req.params.id), (err, doc:IUserModel) => {
      			if(err) return console.log(err);
            res.json(doc);
          })

        }
        else {
          res.status(403).json({
            message: 'Unauthorized access to this part of the API',
            success: false
          });
        }
      }
    });
	},
}
