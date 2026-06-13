import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080/api/auth';
  private TOKEN_KEY = 'jwt_token';

  constructor(private http: HttpClient) {}

  // ── LOGIN — send credentials, receive token and store it ──────
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, { username, password })
      .pipe(
        tap(response => {
          // Automatically store the token when login succeeds
          if (response && response.token) {
            this.storeToken(response.token);
            localStorage.setItem('role', response.role);
            localStorage.setItem('username', response.username);
          }
        })
      );
  }

  // ── REGISTER — unchanged ──────────────────────────────────────
  register(username: string, password: string, email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, { username, password, email });
  }

  // ── Token Storage ─────────────────────────────────────────────
  storeToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // ── Check if logged in ────────────────────────────────────────
  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
    return !this.isTokenExpired(token);
  }

  // ── Decode the payload from the JWT (no library needed) ───────
  // JWT is: base64(header).base64(payload).base64(signature)
  private decodePayload(token: string): any {
    try {
      const payload = token.split('.')[1];                   // Get the middle part
      const decoded = atob(payload);                         // base64 decode
      return JSON.parse(decoded);                            // parse JSON
    } catch {
      return null;
    }
  }

  // ── Check if token expiry timestamp is in the past ───────────
  private isTokenExpired(token: string): boolean {
    const payload = this.decodePayload(token);
    if (!payload || !payload.exp) return true;
    return (payload.exp * 1000) < Date.now();   // exp is in seconds, Date.now() is ms
  }

  // ── Get role stored in localStorage ──────────────────────────
  getRole(): string | null {
    return localStorage.getItem('role');
  }

  // ── LOGOUT — clear everything from localStorage ───────────────
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem('role');
    localStorage.removeItem('username');
  }
}