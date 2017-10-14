import {Component, OnInit} from '@angular/core';
import {Todo} from '../todo';
import {TodoService} from '../todo.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.less']
})
export class TodoComponent implements OnInit {

  todos: Todo[];
  newTodo: Todo = new Todo();

  constructor(private todoService: TodoService) {
    this.todos = [];
  }

  ngOnInit(): void {
    this.todoService.getAllTodos().map(dt => dt.json().t || []).subscribe(todos => {
      this.todos = todos;
    });
  }

  addTodo(td: any) {
    if (td.value === '') {
      return;
    }
    this.newTodo.title = td.value;
    td.value = '';
    this.todoService.addTodo(this.newTodo).map(rs => {
      const dt = rs.json();
      return dt;
    }).subscribe(b => {
      if (b.error == null) {
        this.newTodo.id = b.t.id;
        this.todos.push(this.newTodo);
        this.newTodo = new Todo();
      }
    });
  }

  toggleTodoComplete(todo) {
    this.todoService.toggleTodoComplete(todo).map(rs => {
      const dt = rs.json();
      return dt.error == null;
    }).subscribe(b => {
      if (b) {
        let inx = -1;
        this.todos.forEach((v, i) => {
          if (v.id === todo.id) {
            inx = i;
          }
        });
        this.todos[inx].complete = !this.todos[inx].complete;
      }
    });
  }

  removeTodo(todo) {
    this.todoService.deleteTodoById(todo.id).map(rs => {
      const dt = rs.json();
      return dt.error == null;
    }).subscribe(b => {
      if (b) {
        this.todos = this.todos
          .filter(td => td.id !== todo.id);
      }
    });
  }

}
