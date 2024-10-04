import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service'; // Asegúrate de tener un servicio de autenticación

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true; // Permitir el acceso a la ruta
  }

  // Redirigir a la página de login si no está autenticado
  router.navigate(['/login']);
  return false; // Denegar el acceso a la ruta
};
