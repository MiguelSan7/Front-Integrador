import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  private apiUrl = 'http://127.0.0.1:3333';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  verTickets(): Observable<any[]> {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.apiUrl}/verTickets`, { headers });
  }

  private getToken(): string {
    return localStorage.getItem('auth_token') || '';
  }
}
