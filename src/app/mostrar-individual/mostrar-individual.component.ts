import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { SocketService } from '../service/socket.service';

@Component({
  selector: 'app-mostrar-individual',
  templateUrl: './mostrar-individual.component.html',
  styleUrls: ['./mostrar-individual.component.scss']
})
export class MostrarIndividualComponent implements OnInit, OnDestroy {
  cunaId: string | null = null;
  sensorId: string | null = null;
  sensorData: any = null;
  apiUrl: string = environment.apiUrl; // Cambia esta URL a la de tu API

  constructor(
    private socketService: SocketService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private cookieService: CookieService
  ) {}

  ngOnInit() {


    // Escuchar cambios en los parámetros de ruta
    this.route.paramMap.subscribe(params => {
      this.cunaId = params.get('id');
      this.sensorId = params.get('sensor');
      if (this.cunaId && this.sensorId) {
        this.fetchSensorData(this.cunaId, this.sensorId);
      }
    });

    // Escuchar el evento 'sensores'
    this.socketService.on('sensores', () => {
      console.log('Nuevo dato recibido');
      if (this.cunaId && this.sensorId) {
        this.fetchSensorData(this.cunaId, this.sensorId);
      }
    });
  }
  ngOnDestroy() {
    // Unsubscribe from WebSocket events to avoid memory leaks
    this.socketService.off('sensores');
  }

  fetchSensorData(cunaId: string, sensorId: string): void {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    this.http.post<any[]>(`${this.apiUrl}/getOneData`, { cuna_id: cunaId, sensor_id: sensorId }, { headers })
      .subscribe(data => {
        this.sensorData = data.length > 0 ? data[0] : null;
        console.log("Datos de sensor actualizados:", this.sensorData);
      }, error => {
        console.error('Error al obtener los datos del sensor', error);
      });
  }
}
