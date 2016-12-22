/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   22-12-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 22-12-2016
*/

import * as mongoose from 'mongoose';

export interface ITodoModel extends mongoose.Document {
  description: string;
  isComplete: boolean;
}
