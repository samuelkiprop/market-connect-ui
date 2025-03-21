import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { url, headers } from './utils';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AllUsersResponse {
  status: string;
  data: User[];
}

interface DeleteUserResponse {
  status: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  getCurrentUser(): Observable<AllUsersResponse> {
    return this.http.get<AllUsersResponse>(`${url}/users/me`, { headers });
  }

  getAllUsers(): Observable<AllUsersResponse> {
    return this.http.get<AllUsersResponse>(`${url}/users`, { headers });
  }

  deleteUser(userId: string): Observable<DeleteUserResponse> {
    return this.http.delete<DeleteUserResponse>(`${url}/users/${userId}`, {
      headers,
    });
  }
}
