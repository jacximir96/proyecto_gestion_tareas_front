import {Observable} from 'rxjs';
import {LoginRequest, LoginResponse, RegisterRequest} from '../models/auth.model';

export abstract class AuthRepository {
  abstract login(credentials: LoginRequest): Observable<LoginResponse>;
  abstract register(user: RegisterRequest): Observable<LoginResponse>;
}
