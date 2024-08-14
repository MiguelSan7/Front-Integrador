import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BebesService {

  private apiUrl = environment.apiUrl; // Cambia esto por la URL de tu API

  constructor(private http: HttpClient) {}

  getBebes(token: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/verBebes`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  
  }
  createBebe(bebe: any, token: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/createBebe`, bebe, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  }
  getBebe(id: string, token:string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/showBebe/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  }

  updateBebe(id: string, bebe: any,token:string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updateBebe/${id}`, bebe, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  }
}
