import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';  // ← your new service

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  rememberMe: boolean = false;
  showPassword: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';    // ← NEW: show error messages to user

  // Inject AuthService and Router via constructor
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin(): void {
    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter both username and password.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';   // Clear previous errors

    // Call the real API — replace the fake setTimeout
    this.authService.login(this.username, this.password).subscribe({

      // ✅ SUCCESS — backend returned 200 OK
      next: (response) => {
        this.isLoading = false;
        console.log('Login success:', response);

        // Store user info in sessionStorage (or localStorage for remember me)
        if (this.rememberMe) {
          localStorage.setItem('username', response.username);
          localStorage.setItem('role', response.role);
        } else {
          sessionStorage.setItem('username', response.username);
          sessionStorage.setItem('role', response.role);
        }

        // Navigate to dashboard after successful login
        this.router.navigate(['/dashboard']);
      },

      // ❌ ERROR — backend returned 4xx or 5xx
      error: (err) => {
        this.isLoading = false;
        // err.error is the JSON body returned by Spring Boot
        this.errorMessage = err.error?.message || 'Login failed. Please try again.';
        console.error('Login error:', err);
      }
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}