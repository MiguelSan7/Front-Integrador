import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  private apiUrl = environment.apiUrl + '/getAllAdminData'; 

  private getHeaders(): HttpHeaders {
    const token = this.cookieService.get('auth_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getAllAdminData(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getHeaders() });
  }
}
