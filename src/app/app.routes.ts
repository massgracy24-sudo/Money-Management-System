import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '',          redirectTo: 'login', pathMatch: 'full' },
  { path: 'login',     component: LoginComponent },   // public
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]   // 🔒 Protected — requires a valid JWT
  },
];