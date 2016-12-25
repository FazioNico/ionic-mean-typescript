/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   25-12-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 25-12-2016
*/

import * as mongoose from 'mongoose';
// Import Schemas
import { UserSchema } from './user.schema';

export interface IUserModel extends mongoose.Document {
  name: string,
  password: string,
  admin: boolean
}

// Define & export Mongoose Model with Interface
export const User = mongoose.model<IUserModel>('users', UserSchema);