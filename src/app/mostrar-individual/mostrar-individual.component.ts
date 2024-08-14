import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-mostrar-individual',
  templateUrl: './mostrar-individual.component.html',
  styleUrls: ['./mostrar-individual.component.scss']
})
export class MostrarIndividualComponent implements OnInit {
  cunaId: string | null = null;
  sensorId: string | null = null;
  sensorData: any = null;
  apiUrl: string = 'http://127.0.0.1:3333/getOneData'; // Cambia esta URL a la de tu API

  constructor(private route: ActivatedRoute, private http: HttpClient, private cookieService:CookieService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.cunaId = params.get('id');
      this.sensorId = params.get('sensor');
      if (this.cunaId && this.sensorId) {
        this.fetchSensorData(this.cunaId, this.sensorId);
      }
    });
  }

  fetchSensorData(cunaId: string, sensorId: string): void {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    this.http.post<any[]>(this.apiUrl, { cuna_id: cunaId, sensor_id: sensorId },{headers})
      .subscribe(data => {
        this.sensorData = data.length > 0 ? data[0] : null;
      }, error => {
        console.error('Error fetching sensor data', error);
      });
  }
}

