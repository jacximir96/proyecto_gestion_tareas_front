import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Task} from '../../core/models/task.model';
import {TaskRepository as ITaskRepository} from '../../core/repositories/task.repository';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TaskApiService implements ITaskRepository {
  private readonly apiBaseUrl = environment.apiBaseUrl;
  private readonly tasksPath = environment.tasksPath;

  constructor(private http: HttpClient) { }

  getTasksByUser(): Observable<Task[]> {
    const url = `${this.apiBaseUrl}${this.tasksPath}`;
    return this.http.get<{ meta: any; data: { tasks: Task[] } }>(url).pipe(
      map(response => response.data.tasks)
    );
  }

  addTask(task: Task): Observable<Task> {
    const url = `${this.apiBaseUrl}${this.tasksPath}`;
    return this.http.post<{ meta: any; data: { tarea: Task } }>(url, task).pipe(
      map(response => response.data.tarea)
    );
  }

  updateTask(task: Task): Observable<Task> {
    const url = `${this.apiBaseUrl}${this.tasksPath}/${task.id}`;
    return this.http.put<{ meta: any; data: { tarea: Task } }>(url, task).pipe(
      map(response => response.data.tarea)
    );
  }

  deleteTask(taskId: string): Observable<void> {
    const url = `${this.apiBaseUrl}${this.tasksPath}/${taskId}`;
    return this.http.delete<void>(url);
  }
}
