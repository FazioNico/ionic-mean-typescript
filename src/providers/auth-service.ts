/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   25-12-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 26-12-2016
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

  private AuthUrl:string = "http://localhost:8080/auth"
  private isAuthUrl:string = "http://localhost:8080/isauth"
  private signUpUrl:string = "http://localhost:8080/signup"

  constructor(public http: Http) {
  }

  /* Methode to check if user is currenty loged with jwt */
  isAuth():Observable<boolean|any>{
    // Get storage data
    let storage:any = JSON.parse(localStorage.getItem('authTokenTest'))
    // if storage not found
    if(!storage){
      return Observable.create( (observer)=> {
          observer.next(false);
          observer.complete();
          // Note that this is optional, you do not have to return this if you require no cleanup
          //return () => { console.log('unsubscribe'); };
      });
    }
    // If storage is found
    //console.log('token-> ', storage.token)
    // Define Heders request
    let headers:Headers = new Headers({'cache-control': 'no-cache','x-access-token': storage.token});
    let options:RequestOptions = new RequestOptions({ headers: headers });
    // send request to Auth service
    return this.http.get(this.isAuthUrl, options)
               .map(res => res.json())
               .catch(this.handleError);
  }

  /* Methode to log the user with name & password coming from loginForm */
  loginUser(user): Observable<any> {
    let headers:Headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    let options:RequestOptions = new RequestOptions({ headers: headers });

    let userReady:string = `name=${user.name}&password=${user.password}`;
    //console.log('UserReady-> ', userReady)
    // Post request with data & headers
    return this.http.post(this.AuthUrl, userReady, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  /* Methode to registre the user with name & password coming from signupForm */
  signUp(user): Observable<any> {
    // Formate data as string
    let body:string = JSON.stringify(user);
    let headers:Headers = new Headers({'Content-Type': 'application/json'});
    // Post request with data & headers
    return this.http.post(this.signUpUrl, body, {headers: headers})
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  /* Methode to formate data output */
  extractData(res: Response):void {
      let body = res.json();
      //return body.data || { };
      return body || {};
  }

  /* Methode to handleError for Observable and return error as observable */
  handleError (error: Response | any):Observable<any> {
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
