/* import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../servicios/login.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state): Observable<boolean> => {
  const token = localStorage.getItem("token") || "";
  const router = inject(Router);
  const verificar = inject(LoginService);

  if (token) {
    return verificar.verificarToken().pipe(
      map(response => {
        if (response.isTrue) {
          return true; // El token es válido, permite la navegación
        } else {
          router.navigate(['login']); // Redirige a la página de login
          return false; // Bloquea la navegación
        }
      }),
      catchError(error => {
        console.log(error);
        router.navigate(['login']); // Redirige a la página de login en caso de error
        return of(false); // Bloquea la navegación
      })
    );
  } else {
    router.navigate(['login']); // Redirige a la página de login si no hay token
    return of(false); // Bloquea la navegación
  }
};
 */

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../servicios/login.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const isBrowser = () => typeof window !== 'undefined';

const redirectToLogin = (router: Router): void => {
  router.navigate(['login']);
};

export const authGuard: CanActivateFn = (route, state): Observable<boolean> => {
  if (isBrowser()) {
    const token = localStorage.getItem("token") || "";
    const router = inject(Router);
    const verificar = inject(LoginService);

    if (token) {
      return verificar.verificarToken().pipe(
        map(response => {
          if (response.isTrue) {
            return true; // El token es válido, permite la navegación
          } else {
            redirectToLogin(router); // Redirige a la página de login
            return false; // Bloquea la navegación
          }
        }),
        catchError(error => {
          console.error('Error de verificación de token:', error);
          redirectToLogin(router); // Redirige a la página de login en caso de error
          return of(false); // Bloquea la navegación
        })
      );
    } else {
      redirectToLogin(router); // Redirige a la página de login si no hay token
      return of(false); // Bloquea la navegación
    }
  }
  return of(false);
};
