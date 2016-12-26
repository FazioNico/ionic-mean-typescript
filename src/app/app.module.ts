/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   14-12-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 14-12-2016
*/

import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { HomePage } from '../pages/home/home';
import { TodoEditPage } from '../pages/todo-edit/todo-edit';

import {TodoService} from '../providers/todo-service';
import { AuthService } from '../providers/auth-service';


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignupPage,
    HomePage,
    TodoEditPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignupPage,
    HomePage,
    TodoEditPage
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    },
    TodoService,
    AuthService
  ]
})
export class AppModule {}
