import {Injectable} from '@angular/core';
import {Todo} from './todo';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TodoService {


  // Placeholder for last id so we can simulate
  // automatic incrementing of id's
  lastId = 0;

  // Placeholder for todo's
  todos: Todo[] = [];

  api = 'http://localhost:8800';

  constructor(private http: Http) {
  }

  // Simulate POST /todos
  addTodo(todo: Todo): Observable<any> {
    return this.http.post(this.api + '/add', {
      todo: todo
    });
  }

  // Simulate DELETE /todos/:id
  deleteTodoById(id: string): Observable<any> {
    return this.http.delete(this.api + '/delete/' + id);
  }

  // Simulate GET /todos
  getAllTodos(): Observable<any> {
    return this.http.get(this.api);
  }

  toggleTodoComplete(todo: Todo): Observable<any> {
    if (todo.complete) {
      return this.http.put(this.api + '/remove-complete', {
        id: todo.id,
      });
    }
    return this.http.put(this.api + '/set-complete', {
      id: todo.id,
    });
  }
}
