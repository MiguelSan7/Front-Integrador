import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TicketsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  verTickets(): Observable<any[]> {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.apiUrl}/verTickets`, { headers });
  }

  private getToken(): string {
    return this.cookieService.get('auth_token') || '';
  }
  changeStatus(ticketId: number, status: string): Observable<any> {
    const validStatuses = ['en espera', 'revision', 'concluida'];
    if (!validStatuses.includes(status)) {
      console.error('Estado no válido');
      return of(null);
    }
  
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const encodedStatus = encodeURIComponent(status);
    return this.http.put(`${this.apiUrl}/changeStatus/${ticketId}/${encodedStatus}`, {}, { headers, responseType: 'json' });
  }
}
