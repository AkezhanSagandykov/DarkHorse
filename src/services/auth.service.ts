import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private accessTokenKey = 'access_token';
  private refreshTokenKey = 'refresh_token';

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post('http://localhost:8000/api/token/', {
      username,
      password
    }).pipe(
      tap((res: any) => {
        this.saveToken(res.access);
        this.saveRefreshToken(res.refresh);
      })
    );
  }

  refreshToken() {
    const refresh = this.getRefreshToken();
    return this.http.post('http://localhost:8000/api/token/refresh/', {
      refresh
    }).pipe(
      tap((res: any) => {
        this.saveToken(res.access);
      })
    );
  }

  saveToken(token: string) {
    localStorage.setItem(this.accessTokenKey, token);
  }

  saveRefreshToken(token: string) {
    localStorage.setItem(this.refreshTokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  logout() {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
