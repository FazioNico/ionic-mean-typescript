/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   27-12-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 27-12-2016
*/

import { Component, Input } from '@angular/core';

import { AuthService } from '../../providers/auth-service';

/*
  Generated class for the HeaderComponent component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'header-content',
  templateUrl: 'header-content.html'
})
export class HeaderContent {

  @Input() title: string;

  constructor(
    private _Auth: AuthService
  ){
    console.log('Hello HeaderContent Component');
  }

  onLogOut(){
    this._Auth.dellToken()
  }
}
