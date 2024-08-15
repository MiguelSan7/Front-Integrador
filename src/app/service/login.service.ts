import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = environment.apiUrl;

  constructor(private router: Router, private http: HttpClient, private cookieService: CookieService) { }

  login(uid: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { uid, password }, { responseType: 'json' }).pipe(
      map((response: any) => {
        if (response && response.token) {
          this.cookieService.set('auth_token', response.token);
        }
        return response;
      }),
      catchError((error) => {
        console.error('Login error:', error);
        const errorMessage = error.error?.message || 'Credenciales incorrectas'; // Extrae el mensaje de error
        return throwError(errorMessage);
      })
    );
  }

  verify(email: string, code: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify`, { email, code }).pipe(
      map((response: any) => {
        if (response && response.token) {
          this.cookieService.set('auth_token', response.token);
        }
        return response;
      }),
      catchError((error) => {
        console.error('Verification error:', error);
        const errorMessage = error.error?.message || 'Codigo de veririfcación incorrecto';
        return throwError(errorMessage);
      })
    );
  }

  logout(): void {
    this.cookieService.delete('auth_token');
    this.cookieService.delete('rol');
    this.cookieService.delete('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.cookieService.get('auth_token');
  }
}
