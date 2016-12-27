/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   26-12-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 27-12-2016
*/

import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import {Validators, FormBuilder } from '@angular/forms';

import { AuthService } from '../../providers/auth-service';

/*
  Generated class for the Signup page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  signupForm:any;
  loader:any;
  errorMessage:any;

  constructor(
    public navCtrl: NavController,
    private _formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public loadCtrl:LoadingController,
    private _Auth: AuthService
  ) {

    this.signupForm = this._formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(10)])],
    });
  }

  /* Events Methodes */
  ionViewDidLoad() {
    console.log('Hello SignupPage Page');
  }

  onSignup():void{
    // Display loader
    this.loader = this.loadCtrl.create({
      dismissOnPageChange: true,
    });
    this.loader.present();
    // Send data formto _Auth.signUp() Observabe service
    this._Auth.signUp(this.signupForm.value)
         .subscribe(
           result  => {
             // If user is successly regitred
             if(result.success === true){
               console.log('Success: signup result -> ',result)
               // create user token & redirect user on HomePage
               this.createToken(this.signupForm.value)
             }
             else {
               console.log('Failed to signup:-> ', result)
               this.showError(result.message, true)
             }
           },
           // if error with signup() request
           error =>  {
             this.errorMessage = <any>error
             console.log('Error request :-> ', this.errorMessage)
           });
  }

  /* Core Methodes */
  createToken(userData):void{
    // subscribe to loginUser() with form.data
    this._Auth.loginUser(userData)
         .subscribe(
           result  => {
             if(result.success === true){
               console.log('Success: Auth token-> ',result)
               this.saveToken(result.token)
               //this.navCtrl.setRoot(HomePage)
             }
             else {
               console.log('Failed to Auth:-> ', result)
               this.showError(result.message, true)
             }
           },
           error =>  {
             this.errorMessage = <any>error
             console.log('Error request :-> ', this.errorMessage)
           });
  }

  saveToken(token):void{
    // Format data before storage
    let data = {
      'token': token
    };
    this._Auth.saveToken(JSON.stringify(data))
    // Browser save token data
    //window.localStorage.setItem('authTokenTest', JSON.stringify(data))
    // mobile save token data
    // TODO: test on mobile with browser methode & add mobile methode if nessesary
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
