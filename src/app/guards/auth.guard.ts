import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// Functional guard (Angular 17+ style)
export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;   // ✅ Token is valid — allow navigation
  }

  // ❌ No valid token — redirect to login
  router.navigate(['/login']);
  return false;
};