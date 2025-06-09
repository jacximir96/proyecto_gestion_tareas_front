import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {LoginRequest, LoginResponse, RegisterRequest} from '../../core/models/auth.model';
import {AuthRepository as IAuthRepository} from '../../core/repositories/auth.repository';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService implements IAuthRepository {
  private readonly apiBaseUrl = environment.apiBaseUrl;
  private readonly authLoginPath = environment.authLoginPath;
  private readonly authRegisterPath = environment.authRegisterPath;

  constructor(private http: HttpClient) { }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiBaseUrl}${this.authLoginPath}`, credentials);
  }

  register(user: RegisterRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiBaseUrl}${this.authRegisterPath}`, user);
  }
}
