import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/components/login/login';
import { TaskComponent } from './features/tasks/components/task/task';
import { AuthGuard } from './core/guards/auth.guard'; // ← Añadir un guard opcional

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'tasks',
    component: TaskComponent,
    canActivate: [AuthGuard]
  }
];
