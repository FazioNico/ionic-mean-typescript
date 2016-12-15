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

  public todos:any[];

  constructor(
    public navCtrl: NavController,
    public todoService: TodoService
  ) {
    this.loadTodos();
  }

  loadTodos():void{
    this.todoService.load()
        .subscribe(data => {
          console.log('load data->', data)
          this.todos = data;
        },
        err => {
          console.log('Observable Error-> ' ,err)
        })
  }

  addTodo(todoInput:HTMLInputElement):void {
    //console.log(todo)
    this.todoService.add(todoInput.value)
        .subscribe(data  => {
          this.todos.push(data)
        },
        err => {
          console.log('Observable Error-> ' ,err)
        });
    this.clearInput(todoInput);
  }

  toggleComplete(todo:any):void {
    todo.isComplete = !todo.isComplete;
    this.todoService.update(todo)
        .subscribe(data => {
          todo = data;
        },
        err => {
          console.log('Observable Error-> ' ,err)
        })
  }

  deleteTodo(todo:HTMLObjectElement):void {
    //console.log('todo-> ', todo)
    let index:number = this.todos.indexOf(todo);
    this.todoService.delete(todo)
        .subscribe(response => {
          if(index > -1){
              this.todos.splice(index, 1);
          }
        },
        err => {
          console.log('Observable Error-> ' ,err)
        });
  }

  clearInput(todoInput:HTMLInputElement):void{
    todoInput.value = '';
  }

  navToEdit(todo:HTMLObjectElement):void {
    let index:number = this.todos.indexOf(todo);
    if(index > -1){
      this.navCtrl.push(TodoEditPage, {
        todo: todo,
        todos: this.todos,
        index: index
      });
    }
  }
}
