import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  private getHeaders(): HttpHeaders {
    const token = this.cookieService.get('auth_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  createAdmin(adminData: any): Observable<any> {
    console.log('Enviando datos de admin a la API:', adminData);
    return this.http.post(`${this.apiUrl}/createAdmins`, adminData, { headers: this.getHeaders() });
  }

  getAdmins(): Observable<any> {
    return this.http.get(`${this.apiUrl}/showAdmins`, { headers: this.getHeaders() });
  }

  getAdminById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/showAdmins/${id}`, { headers: this.getHeaders() });
  }

  updateAdmin(id: string, adminData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateAdmins/${id}`, adminData, { headers: this.getHeaders() });
  }

  deleteAdmin(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteAdmins/${id}`, { headers: this.getHeaders() });
  }
}