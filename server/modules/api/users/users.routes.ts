/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   25-12-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 25-12-2016
*/

import * as express from 'express';
import { userController }  from "../../mongodb/users/users.controller";
import { log } from '../../log';

var router = express.Router();

export class UsersRoutes {

    private _UsersController: any;

    constructor () {
        this._UsersController = userController;
    }

    routes() {
        var controller = this._UsersController;
        //router.get('/setup', log, controller.setup)
        router.get('/users', log, controller.getAll)
        return router;
    }

}
