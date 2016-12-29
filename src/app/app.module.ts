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

import { HeaderContent } from '../components/header-content/header-content';

import {TodoService} from '../providers/todo-service';
import { AuthService } from '../providers/auth-service';

const pages:Array<any> = [
  LoginPage,
  SignupPage,
  HomePage,
  TodoEditPage
];
const components:Array<any> = [
  HeaderContent
];
const ionicAppConfig:Object = {
  tabsPlacement: 'bottom',
  mode: 'md'
};
const providers:Array<any> = [
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    },
    TodoService,
    AuthService
];

@NgModule({
  declarations: [MyApp, ...pages, ...components],
  imports: [
    IonicModule.forRoot(MyApp, ionicAppConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, ...pages],
  providers: [...providers]
})
export class AppModule {}
