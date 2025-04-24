import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.authService.getToken();
    let authReq = req;

    if (accessToken) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Пробуем обновить токен
          return this.authService.refreshToken().pipe(
            switchMap((res: any) => {
              this.authService.saveToken(res.access); // сохраняем новый access
              const clonedReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${res.access}`,
                },
              });
              return next.handle(clonedReq); // повторяем оригинальный запрос
            }),
            catchError(err => {
              this.authService.logout();
              return throwError(() => err);
            })
          );
        }

        return throwError(() => error);
      })
    );
  }
}
