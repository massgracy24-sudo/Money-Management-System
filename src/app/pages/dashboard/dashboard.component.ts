import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  username: string = '';
  role: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Read the stored user info that was saved during login
    this.username = sessionStorage.getItem('username')
                 || localStorage.getItem('username')
                 || 'User';
    this.role = sessionStorage.getItem('role')
             || localStorage.getItem('role')
             || 'USER';
  }

  logout(): void {
    // Clear stored session data and redirect back to login
    sessionStorage.clear();
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
}
