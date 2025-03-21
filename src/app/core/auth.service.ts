import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {url} from './utils'

interface LoginRequest {
  email: string;
  password: string;
}

interface SignupRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

interface SignupResponse {
  message: User;
  status: string;
  token: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

interface LoginResponse {
  message: User;
  status: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  signup(data: SignupRequest): Observable<SignupResponse> {
    return this.http.post<SignupResponse>(`${url}/auth/signup`, data).pipe(
      tap((response) => {
        if (response.status === 'success') {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.message));
        }
      })
    );
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${url}/auth/login`, credentials).pipe(
      tap((response) => {
        if (response.status === 'success') {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.message));
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
