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
  verTicketsPersonal(): Observable<any[]> {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.apiUrl}/verTicketsPersonal`, { headers });
  }
  createTicket(ticketData: any): Observable<any> {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(`${this.apiUrl}/createTicket`, ticketData,{headers});
  }
  getTicket(id: string): Observable<any> {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.get<any>(`${this.apiUrl}/showTicket/${id}`,{headers});
  }

  // Método para actualizar un ticket
  updateTicket(id: string, ticketData: any): Observable<any> {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.put<any>(`${this.apiUrl}/editTicket/${id}`, ticketData,{headers});
  }
}
