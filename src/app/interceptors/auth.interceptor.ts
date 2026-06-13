import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

// Functional interceptor (Angular 17+ style — no class needed)
export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  const token = authService.getToken();

  // If we have a token, clone the request and add the Authorization header
  if (token) {
    const clonedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
      //                                          ↑ Spring's JwtAuthFilter reads this
    });
    return next(clonedReq);
  }

  // No token — send the request as-is (public endpoints like /login will still work)
  return next(req);
};