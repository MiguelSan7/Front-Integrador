import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { SocketService } from '../service/socket.service';

@Component({
  selector: 'app-menu-cuna',
  templateUrl: './menu-cuna.component.html',
  styleUrls: ['./menu-cuna.component.scss']
})
export class MenuCunaComponent implements OnInit {
  routeId: number = 0;
  private apiUrl = environment.apiUrl;
  isLoading: boolean = false; // Estado para manejar la carga
  buttonsDisabled: boolean = false; // Estado para manejar la deshabilitación de botones

  // Datos para los botones, inicializados vacíos
  firstEightButtons: { imgSrc: string, route: string, label: string }[] = [];
  thirdButton = { label: 'Encender Cuna', action: () => this.EncenderCuna(), icon: 'assets/images/cuna.png' };
  
  additionalButtons = [
    { label: 'Encender Luz', action: () => this.sendCommand(3), icon: 'assets/images/luz.png' },
    { label: 'Historial', action: () => this.navigateToHistorial(), icon: 'assets/images/historial.png' },
    { label: 'Activar Motor', action: () => this.sendCommand(9), icon: 'assets/images/juguete.png' }
  ];

  constructor(
    private socketService: SocketService,
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Obtener el ID de la ruta
    this.routeId = parseInt(this.route.snapshot.paramMap.get('id') || '');
    // Conéctate al servidor WebSocket
    this.socketService.on('connect', () => {
      console.log('Conectado al servidor WebSocket');
    });
    // Configurar los datos de los botones después de obtener el ID
    this.firstEightButtons = [
      { imgSrc: 'assets/images/temperatura.png', route: `/individual/${this.routeId}/TP`, label: 'Temperatura' },
      { imgSrc: 'assets/images/gas.png', route: `/individual/${this.routeId}/MQ`, label: 'Gas' },
      { imgSrc: 'assets/images/cardiaca.png', route: `/individual/${this.routeId}/SRC`, label: 'Cardiaca' },
      { imgSrc: 'assets/images/humedad.png', route: `/individual/${this.routeId}/HM`, label: 'Humedad' },
      { imgSrc: 'assets/images/luz.png', route: `/individual/${this.routeId}/FR`, label: 'Luz' },
      { imgSrc: 'assets/images/peso.png', route: `/individual/${this.routeId}/PE`, label: 'Peso' },
      { imgSrc: 'assets/images/sonido.png', route: `/individual/${this.routeId}/SD`, label: 'Sonido' },
      { imgSrc: 'assets/images/sensores.png', route: `/todos/${this.routeId}`, label: 'Sensores' }
    ];
  }

  navigate(route: string) {
    if (!this.buttonsDisabled) {
      this.router.navigate([route]);
    }
  }
  
  navigateToHistorial() {
    if (!this.buttonsDisabled) {
      this.router.navigate([`/historial/${this.routeId}`]);
    }
  }
  
  sendCommand(number: number) {
    if (!this.buttonsDisabled) {
      const token = this.cookieService.get('auth_token');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });
  
      this.http.post<any>(`${this.apiUrl}/sendNumber`, { cuna_id: this.routeId, number }, { headers })
        .subscribe(response => {
          alert('¡Acción realizada correctamente!');
        }, error => {
          alert('Error realizando la acción: ' + "Verifica que la cuna este recibiendo corriente y este prendida");
        });
    }
  }
  
  EncenderCuna() {
    this.isLoading = true; // Inicia la carga
    this.buttonsDisabled = true; // Deshabilita los botones
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    this.http.post<any>(`${this.apiUrl}/startCycle`, { cuna_id: this.routeId }, { headers })
      .subscribe(
        response => {
          this.isLoading = false; // Detiene la carga
          this.buttonsDisabled = false; // Habilita los botones nuevamente
          console.log('Response:', response);
          alert('¡Cuna Apagada Correctamente!');
        },
        error => {
          this.isLoading = false; // Detiene la carga
          this.buttonsDisabled = false; // Habilita los botones nuevamente
          console.error('Error:', error);
  
          if (error.status === 408) {
            alert('¡Cuna encendida correctamente!)');
          } else if (error.error && error.error.message) {
            alert('Error realizando la acción: ' + error.error.message);
          } else {
            alert('Error realizando la acción: Verifica que la cuna esté recibiendo corriente y esté prendida');
          }
        }
      );
  }
}
