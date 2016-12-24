/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   22-12-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 22-12-2016
*/

import * as mongoose from 'mongoose';

export const todoSchema = new mongoose.Schema({
  	description: String,
    isComplete: {
      type: Boolean,
      default: false
    }
});
