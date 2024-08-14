import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,throwError  } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { Cuna } from '../intefaces/cuna';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CunasService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  private getHeaders(): HttpHeaders {
    // Obtener el token de la cookie
    const token = this.cookieService.get('auth_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  Create(cunaData: any): Observable<any> {
    console.log('Enviando datos a la API:', cunaData);
    return this.http.post(`${this.apiUrl}/admincreate`, cunaData, { headers: this.getHeaders() });
  }

  showCuna(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/showCuna/${id}`, { headers: this.getHeaders() });
  }

  adminUpdate(id: string, cuna: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/adminUpdate/${id}`, cuna, { headers: this.getHeaders() });
  }

  adminDestroy(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/AdminDestroy/${id}`, { headers: this.getHeaders() });
  }

  getCunas(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/AdminIndex`, { headers: this.getHeaders() });
  }
  getCunasUser(): Observable<Cuna[]> {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' // Asume que el token está guardado
    });

    return this.http.get<{ cunas: Cuna[] }>(`${this.apiUrl}/UserIndex`, { headers })
    .pipe(
      map(response => response.cunas) // Aquí mapeamos la respuesta para obtener directamente el array de cunas
    );
}
addCuna(numserie: string, apodo: string): Observable<{ message: string, data: Cuna }> {
  const token = this.cookieService.get('auth_token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });

  const body = {
    numserie,
    apodo
  };

  return this.http.post<{ message: string, data: Cuna }>(`${this.apiUrl}/userCreate`, body, { headers })
    .pipe(
      catchError(error => {
        console.error('Error al agregar la cuna:', error);
        return throwError(error);
      })
    );
}
}
