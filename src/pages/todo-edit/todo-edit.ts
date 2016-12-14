/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   14-12-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 14-12-2016
*/

import { Component } from "@angular/core";
import { NavController, NavParams } from 'ionic-angular';
import { TodoService } from '../../providers/todo-service';
//import {Todo} from '../../todo.ts';

/*
  Generated class for the TodoEdit page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-todo-edit',
  templateUrl: 'todo-edit.html'
})
export class TodoEditPage {
  public todo: any;    // The todo itself
  public todos: Array<any>; // The list of todos from the main page
  public index: number; // The index of the todo we're looking at

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public todoService: TodoService
  ) {
    this.todo = navParams.get('todo');
    this.todos = navParams.get('todos');
    this.index = navParams.get('index');
  }

  ionViewDidLoad() {
    console.log('Hello TodoEditPage Page');
  }

  saveTodo(updatedDescription: string) {
    this.todo.description = updatedDescription;
    this.todoService.update(this.todo)
        .subscribe(response => {
          this.navCtrl.pop(); // go back to todo list
        });
  }

  deleteTodo() {
    this.todoService.delete(this.todo)
      .subscribe(response => {
        this.todos.splice(this.index, 1); // remove the todo
        this.navCtrl.pop(); //go back to todo list
      });
  }

  cancel(){
    this.navCtrl.pop()
  }
}
