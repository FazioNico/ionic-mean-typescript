/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   24-12-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 24-12-2016
*/

import * as express from 'express';
import { TodosRoutes }  from "../api/todos/todosRoutes";
import { log } from '../log';

const app = express();

export class APIRoutes {

    routes() {
        app.use("/", new TodosRoutes().routes());
        //app.use("/", new otherRoutes().routes);
        return app;
    }

}
