/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   14-12-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 14-12-2016
*/

import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

//import {Todo} from '../../todo.ts';

@Injectable()
export class TodoService {
  todosUrl = "http://localhost:8080/api/todos"

  constructor(public http: Http) {
  }

  // Get all todos
  load(): Observable<any> {
    return this.http.get(this.todosUrl)
               .map(res => res.json())
               .catch(this.handleError);
  }

  // Add a todo-edit
  add(todo: string): Observable<any> {
    console.log('add item-> ', todo)
    let body = JSON.stringify({description: todo});
    let headers = new Headers({'Content-Type': 'application/json'});

    return this.http.post(this.todosUrl, body, {headers: headers})
                    .map(res => res.json())
                    .catch(this.handleError);
  }

  // Update a todo
  update(todo: any) {
    let url = `${this.todosUrl}/${todo._id}`; //see mdn.io/templateliterals
    let body = JSON.stringify(todo)
    let headers = new Headers({'Content-Type': 'application/json'});

    return this.http.put(url, body, {headers: headers})
                    .map(() => todo) //See mdn.io/arrowfunctions
                    .catch(this.handleError);
  }

  // Delete a todo
  delete(todo: any) {
    let url = `${this.todosUrl}/${todo._id}`;
    let headers = new Headers({'Content-Type': 'application/json'});

    return this.http.delete(url, headers)
               .catch(this.handleError);
  }

  handleError(error) {
      console.error(error);
      return Observable.throw(error.json().error || 'Server error');
  }

}
