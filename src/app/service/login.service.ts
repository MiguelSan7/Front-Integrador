import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://127.0.0.1:3333';

  constructor(private router: Router, private http: HttpClient, private cookieService: CookieService) { }

  login(uid: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { uid, password }, { responseType: 'text' }).pipe(
      map((response: any) => {
        try {
          const parsedResponse = JSON.parse(response);
          if (parsedResponse && parsedResponse.token) {
            this.cookieService.set('auth_token', parsedResponse.token);
          }
          return parsedResponse;
        } catch (e) {
          return { message: response };
        }
      }),
      catchError((error) => {
        console.error('Login error:', error);
        return throwError(error);
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
        return throwError(error);
      })
    );
  }

  logout(): void {
    this.cookieService.delete('auth_token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.cookieService.get('auth_token');
  }
}
