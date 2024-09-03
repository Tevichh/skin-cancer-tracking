import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (typeof window === 'undefined') {
    return next(req);
  }

  // Recupera el token de localStorage
  const token = localStorage.getItem("token");

  // Si el token existe, clona la solicitud original y le agrega el header Authorization
  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedRequest);  // Envía la solicitud clonada con el token en el header
  } else {
    return next(req);  // Si no hay token, envía la solicitud original
  }
};
