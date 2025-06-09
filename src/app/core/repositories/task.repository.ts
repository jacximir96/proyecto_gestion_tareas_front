import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

export abstract class TaskRepository {
  abstract getTasksByUser(): Observable<Task[]>;
  abstract addTask(task: Task): Observable<Task>;
  abstract updateTask(task: Task): Observable<Task>;
  abstract deleteTask(taskId: string): Observable<void>;
}
