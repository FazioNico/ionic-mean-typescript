import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import {Validators, FormBuilder } from '@angular/forms';

import { HomePage } from '../home/home';
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
    this.loader = this.loadCtrl.create({
      dismissOnPageChange: true,
    });
    this.loader.present();
    this.signupForm = this._formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  /* Events Methodes */
  ionViewDidLoad() {
    console.log('Hello SignupPage Page');
  }

  onSignup():void{
    this._Auth.loginUser(this.signupForm.value)
         .subscribe(
           result  => {
             if(result.success === true){
               console.log('Success: Auth token-> ',result)
               //this.saveToken(result.token)
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
