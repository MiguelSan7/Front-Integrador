import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-mostrar-todos',
  templateUrl: './mostrar-todos.component.html',
  styleUrls: ['./mostrar-todos.component.scss']
})
export class MostrarTodosComponent implements OnInit {
  cunaId: string | null = null;
  sensors: any[] = []; // Corregido el nombre de la variable a "sensors"
  apiUrl: string = 'http://127.0.0.1:3333/getRecentData'; // Cambia esta URL a la de tu API

  constructor(private route: ActivatedRoute, private http: HttpClient, private cookieService: CookieService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.cunaId = params.get('id');
      if (this.cunaId) {
        this.fetchSensorData(this.cunaId);
      }
    });
  }

  fetchSensorData(cunaId: string): void {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    this.http.post<any[]>(this.apiUrl, { cuna_id: cunaId }, { headers })
      .subscribe(data => {
        console.log(data);
        this.sensors = data; // Asignar todo el array de sensores
      }, error => {
        console.error('Error fetching sensor data', error);
      });
  }
}
