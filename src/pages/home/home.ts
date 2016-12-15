/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   14-12-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 14-12-2016
*/

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {TodoEditPage} from '../../pages/todo-edit/todo-edit';
import {TodoService} from '../../providers/todo-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public todos: any;

  constructor(
    public navCtrl: NavController,
    public todoService: TodoService
  ) {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.load()
        .subscribe(data => {
          console.log('load data->', data)
          this.todos = data;
        },
      err => {
        console.log('Observable Error-> ' ,err)
      })
  }

  addTodo(todo:string) {
    //console.log(todo)
    this.todoService.add(todo)
        .subscribe(data  => {
          this.todos.push(data)
        });
      todo = '';
  }

  toggleComplete(todo: any) {
    todo.isComplete = !todo.isComplete;
    this.todoService.update(todo)
        .subscribe(data => {
          todo = data;
        },
        err => {
          console.log('Observable Error-> ' ,err)
        })
  }

  deleteTodo(todo: any, index:number) {
    this.todoService.delete(todo)
        .subscribe(response => {
          this.todos.splice(index, 1);
        },
        err => {
          console.log('Observable Error-> ' ,err)
        });
  }

  navToEdit(todo: any, index: number) {
    this.navCtrl.push(TodoEditPage, {
      todo: todo,
      todos: this.todos,
      index: index
    });
  }
}
