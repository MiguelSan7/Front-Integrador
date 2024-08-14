import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menu-cuna',
  templateUrl: './menu-cuna.component.html',
  styleUrls: ['./menu-cuna.component.scss']
})
export class MenuCunaComponent implements OnInit {
  routeId: string = '';
  private apiUrl = environment.apiUrl;

  // Datos para los botones, inicializados vacíos
  firstEightButtons: { imgSrc: string, route: string, label: string }[] = [];
  thirdButton = { label: 'Encender Cuna', action: () => this.EncenderCuna(), icon: 'assets/images/luz.png' };
  
  additionalButtons = [
    { label: 'Encender Luz', action: () => this.sendCommand(3), icon: 'assets/images/luz.png' },
    { label: 'Historial', action: () => this.navigateToHistorial(), icon: 'assets/images/historial.png' },
    { label: 'Activar Motor', action: () => this.sendCommand(9), icon: 'assets/images/juguete.png' }
  ];

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Obtener el ID de la ruta
    this.routeId = this.route.snapshot.paramMap.get('id') || '';

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
    this.router.navigate([route]);
  }
  
  navigateToHistorial() {
    this.router.navigate([`/historial/${this.routeId}`]);
  }
  
  sendCommand(number: number) {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    this.http.post<any>(`${this.apiUrl}/sendNumber`, { cuna_id: this.routeId, number }, { headers })
      .subscribe(response => {
        alert('¡Acción realizada correctamente!');
      }, error => {
        alert('Error realizando la acción: ' + error.message);
      });
  }
  
  EncenderCuna() {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    this.http.post<any>(`${this.apiUrl}/startCycle`, { cuna_id: this.routeId }, { headers })
      .subscribe(response => {
        // Si el código de estado es 200, se apaga correctamente
        if (response.status === 200) {
          alert('¡Cuna apagada correctamente!');
        }
      }, error => {
        // Si el código de estado es 408, se encendió correctamente
        if (error.status === 408) {
          alert('¡Cuna encendida correctamente!');
        } else {
          alert('Error realizando la acción: ' + error.message);
        }
      });
  }
}
