/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   14-12-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 14-12-2016
*/

import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';

import { AuthService } from '../providers/auth-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  loggedIn:boolean;
  rootPage:any = LoginPage;

  constructor(
    platform: Platform,
    private _Auth: AuthService
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  ngOnInit() {
    this._Auth.isAuth()
      .subscribe(loggedIn => {
        this.loggedIn = loggedIn;
        console.log('this.loggedIn-> ', this.loggedIn)
        if(this.loggedIn === true ) this.rootPage = HomePage;
        if(this.loggedIn === false )this.rootPage = LoginPage
      },
      err => {
        console.log('Error isAuth -> ', err);
      }
    );
  }
}
