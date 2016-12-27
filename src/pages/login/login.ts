/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   25-12-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 26-12-2016
*/

import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import {Validators, FormBuilder } from '@angular/forms';
//import { Storage } from '@ionic/storage';

import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
import { AuthService } from '../../providers/auth-service';
/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  userForm:any;
  loader:any;
  errorMessage:any;

  constructor(
    public navCtrl: NavController,
    private _formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public loadCtrl:LoadingController,
    private _Auth: AuthService
  ) {
    this.loader = this.loadCtrl.create({
      dismissOnPageChange: true,
    });
    this.loader.present();
    this.userForm = this._formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(10)])],
    });
  }

  /* Core Methode */
  saveToken(token):void{
    let data = {
      'token': token
    };
    // Browser save token data
    window.localStorage.setItem('authTokenTest', JSON.stringify(data))
    // mobile save token data
    // TODO: test on mobile with browser methode & add mobile methode if nessesary
  }

  /* Events Methodes */
  ionViewDidLoad():void{
    console.log('Hello Login Page');
    this._Auth.isAuth()
      .subscribe(
        result=>{
          console.log('isAuth -> ', result)
          if(result != null && result != false ){
            if(result._id) this.navCtrl.setRoot(HomePage)
          }
          else {
            if(this.loader){
              this.loader.dismiss();
            }
          }
        },
        err => {console.log('Error isAuth -> ', err);this.loader.dismiss();}
      )
  }

  onLogin():void{
    this._Auth.loginUser(this.userForm.value)
         .subscribe(
           result  => {
             if(result.success === true){
               console.log('Success: Auth token-> ',result)
               this.saveToken(result.token)
               this.navCtrl.setRoot(HomePage)
             }
             else {
               console.log('Failed to Auth:-> ', result)
               this.showError(result.message, false)
             }
           },
           error =>  {
             this.errorMessage = <any>error
             console.log('Error request :-> ', this.errorMessage)
           });
  }

  onGoSignup(){
    this.navCtrl.push(SignupPage)
  }

  /* ErrorHandler Methode */
  showError(text:string,hideLoading:boolean=true):void {
    if (hideLoading === true){
      setTimeout(() => {
        this.loader.dismiss();
      });
    }
    let alert = this.alertCtrl.create({
      title: 'Erreur',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
}
