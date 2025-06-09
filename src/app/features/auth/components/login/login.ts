import {Component} from '@angular/core';
import {LoginRequest, RegisterRequest} from '../../../../core/models/auth.model';
import {AuthApiService} from '../../../../data/services/auth-api.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  email = '';
  password = '';
  errors: string[] = [];
  isLoginMode = true;
  loading = false;

  constructor(private authService: AuthApiService, private router: Router) { }

  private showErrors(errors: string[]) {
    this.errors = errors;
    setTimeout(() => (this.errors = []), 5000);
  }

  private validateForm(): boolean {
    if (!this.email.trim() || !this.password.trim()) {
      this.showErrors(['Correo y contraseña son obligatorios']);
      return false;
    }
    return true;
  }

  private handleBackendError(error: unknown, defaultMessage: string) {
    const backendErrors = (error as any)?.error?.meta?.errors;
    this.showErrors(Array.isArray(backendErrors) ? backendErrors : [defaultMessage]);
    console.error(defaultMessage, error);
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.errors = [];
  }

  onSubmit() {
    if (!this.validateForm()) return;

    if (this.isLoginMode) {
      this.loginUser();
    } else {
      this.registerUser();
    }
  }

  loginUser(setLoading = true) {
    if (setLoading) this.loading = true;
    const credentials: LoginRequest = { email: this.email, password: this.password };

    this.authService.login(credentials).subscribe({
      next: (result) => {
        this.loading = false;
        if (!result.meta.success) return this.showErrors(result.meta.errors || []);

        if (result.data?.token) {
          localStorage.setItem('authToken', result.data.token);
          this.router.navigate(['/tasks']);
        } else {
          this.showErrors(['Respuesta inválida del servidor']);
        }
      },
      error: (error) => {
        this.loading = false;
        this.handleBackendError(error, 'Error al iniciar sesión. Inténtalo más tarde.');
      }
    });
  }

  registerUser() {
    this.loading = true;
    const newUser: RegisterRequest = { email: this.email, password: this.password };

    this.authService.register(newUser).subscribe({
      next: (result) => {
        if (!result.meta.success) {
          this.loading = false;
          return this.showErrors(result.meta.errors || []);
        }

        this.loginUser(false);
      },
      error: (error) => {
        this.loading = false;
        this.handleBackendError(error, 'Error al registrarse. Inténtalo más tarde.');
      }
    });
  }
}
