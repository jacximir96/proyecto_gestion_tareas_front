import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Task} from '../../../../core/models/task.model';
import {TaskApiService} from '../../../../data/services/task-api.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task.html',
  styleUrls: ['./task.scss'],
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  newTask: Partial<Task> = {
    title: '',
    description: '',
  };
  currentUserEmail: string = '';
  showConfirmModal = false;
  taskIdToDelete: string | null = null;
  showEditModal = false;
  taskToEdit: Task | null = null;
  editTitle: string = '';
  editDescription: string = '';

  constructor(private taskApiService: TaskApiService, private router: Router) { }

  confirmDelete(taskId: string) {
    this.taskIdToDelete = taskId;
    this.showConfirmModal = true;
  }

  closeConfirmModal() {
    this.showConfirmModal = false;
    this.taskIdToDelete = null;
  }

  openEditModal(task: Task) {
    this.taskToEdit = { ...task };
    this.editTitle = task.title;
    this.editDescription = task.description;
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
    this.taskToEdit = null;
    this.editTitle = '';
    this.editDescription = '';
  }

  private decodeToken(token: string): any | null {
    try {
      const payloadBase64 = token.split('.')[1];
      const payloadJson = atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(payloadJson);
    } catch (error) {
      console.error('Error decodificando token:', error);
      return null;
    }
  }

  ngOnInit() {
    this.loadTasks();

    const token = localStorage.getItem('authToken');
    if (token) {
      const payload = this.decodeToken(token);
      this.currentUserEmail = payload?.email || 'Usuario desconocido';
    }
  }

  loadTasks() {
    this.taskApiService.getTasksByUser().subscribe(tasks => {
      this.tasks = tasks.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    });
  }

  addTask() {
    if (!this.newTask.title?.trim() || !this.newTask.description?.trim()) return;

    const taskToAdd: Task = {
      id: '',
      title: this.newTask.title.trim(),
      description: this.newTask.description.trim(),
      completed: false,
      createdAt: new Date(),
      userId: 'currentUserId'
    };

    this.taskApiService.addTask(taskToAdd).subscribe(task => {
      this.tasks.unshift(task);
      this.newTask = { title: '', description: '' };
    });
  }

  toggleCompleted(task: Task) {
    const updatedTask = { ...task, completed: !task.completed };
    this.taskApiService.updateTask(updatedTask).subscribe(updated => {
      const idx = this.tasks.findIndex(t => t.id === updated.id);
      if (idx > -1) this.tasks[idx] = updated;
    });
  }

  saveEdit() {
    if (!this.taskToEdit) return;
    if (!this.editTitle.trim() || !this.editDescription.trim()) {
      alert('El título y la descripción no pueden estar vacíos.');
      return;
    }

    const updatedTask: Task = {
      ...this.taskToEdit,
      title: this.editTitle.trim(),
      description: this.editDescription.trim(),
    };

    this.taskApiService.updateTask(updatedTask).subscribe(updated => {
      const idx = this.tasks.findIndex(t => t.id === updated.id);
      if (idx > -1) {
        this.tasks[idx] = updated;
      }
      this.closeEditModal();
    });
  }

  deleteTask(taskId: string) {
    if (!confirm('¿Seguro que quieres eliminar esta tarea?')) return;

    this.taskApiService.deleteTask(taskId).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== taskId);
    });
  }

  onConfirmDelete() {
    if (!this.taskIdToDelete) return;

    this.taskApiService.deleteTask(this.taskIdToDelete).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== this.taskIdToDelete);
      this.closeConfirmModal();
    });
  }

  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}
