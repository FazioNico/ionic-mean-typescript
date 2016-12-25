/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   25-12-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 25-12-2016
*/

import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

/*
  Generated class for the Auth provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthService {

  private AuthUrl = "http://localhost:8080/auth"
  private isAuthUrl = "http://localhost:8080/isauth"

  constructor(public http: Http) {

    console.log('Hello Auth Provider');

  }

  isAuth():Observable<boolean|any>{
    let storage = JSON.parse(localStorage.getItem('authTokenTest'))
    if(!storage){
      return Observable.create( (observer)=> {
          observer.next(false);
          observer.complete();
          // Note that this is optional, you do not have to return this if you require no cleanup
          //return () => { console.log('unsubscribe'); };
      });
    }
    //console.log('token-> ', storage.token)
    let headers = new Headers({'cache-control': 'no-cache','x-access-token': storage.token});
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.isAuthUrl, options)
               .map(res => res.json())
               .catch(this.handleError);
  }

  loginUser(user): Observable<any> {
    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    let options = new RequestOptions({ headers: headers });

    let userReady = `name=${user.name}&password=${user.password}`;
    //console.log('UserReady-> ', userReady)
    return this.http.post(this.AuthUrl, userReady, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  extractData(res: Response) {
      let body = res.json();
      //return body.data || { };
      return body || {};
  }

  handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
