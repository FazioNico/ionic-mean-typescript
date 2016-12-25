import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import {Validators, FormBuilder } from '@angular/forms';
import { Storage } from '@ionic/storage';

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

  constructor(
    public navCtrl: NavController,
    private _formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public loadCtrl:LoadingController
  ) {
    this.userForm = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  /* Core Methode */


  /* Events Methodes */
  ionViewDidLoad() {
    console.log('Hello Login Page');
  }

  onLogin(){
    console.log('login user ->', this.userForm.value)
    // this.AuthService.loginUser(this.user.value.email, this.user.value.password)
    // .then( authData => {
    //   this.navCtrl.setRoot(TabsPage);
    // }, error => {
    //   this.showError( error.message ,false)
    // });
  }

  /* ErrorsHandler Methode */
  showError(text:string,hideLoading:boolean=true) {
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
