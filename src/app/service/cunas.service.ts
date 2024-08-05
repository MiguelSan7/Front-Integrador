import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CunasService {
  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) {}

  adminCreate(cunaData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/admincreate`, cunaData);
  }

  showCuna(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/showCuna/${id}`);
  }

  adminUpdate(id: string, cunaData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/adminUpdate/${id}`, cunaData);
  }

  adminDestroy(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/AdminDestroy/${id}`);
  }

  getCunas(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/AdminIndex`);
  }
}
