import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

private apiUrl = 'https://place-x-project-hwht.vercel.app/api/auth';

  constructor(
    private http: HttpClient
  ) {}

  register(data: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/register`,
      data
    );
  }

  login(data: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/login`,
      data
    );
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  saveUser(user: any): void {
    localStorage.setItem(
      'user',
      JSON.stringify(user)
    );
  }

  getUser(): any {
    const user = localStorage.getItem('user');

    return user
      ? JSON.parse(user)
      : null;
  }

 saveSession(response: any): void {

  if (response.token) {
    localStorage.setItem(
      'token',
      response.token
    );
  }

  if (response.user) {

    localStorage.setItem(
      'user',
      JSON.stringify(response.user)
    );

    if (response.user._id) {

      localStorage.setItem(
        'userId',
        response.user._id
      );

    }

  }
 }
}