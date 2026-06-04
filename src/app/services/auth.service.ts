import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'   // Singleton — one instance shared across the whole app
})
export class AuthService {

  // Base URL of your Spring Boot backend
  private baseUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  // ── Login — sends POST request to /api/auth/login ──
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, {
      username,
      password
    });
  }

  // ── Register — sends POST request to /api/auth/register ──
  register(username: string, password: string, email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, {
      username,
      password,
      email
    });
  }
}