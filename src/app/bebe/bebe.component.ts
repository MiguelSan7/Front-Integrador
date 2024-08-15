import { Component , OnInit } from '@angular/core';
import { BebesService } from '../service/bebes.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bebe',
  templateUrl: './bebe.component.html',
  styleUrls: ['./bebe.component.scss']
})
export class BebeComponent implements OnInit {
  bebes: any[] = [];
  token: string = '';

  constructor(private router:Router,private bebesService: BebesService, private cookieService: CookieService) {}

  ngOnInit(): void {
    this.token = this.cookieService.get('auth_token');
    this.loadBebes();
  }

  loadBebes() {
    this.bebesService.getBebes(this.token).subscribe(data => {
      this.bebes = data;
    }, error => {
      console.error('Error loading bebes:', error);
    });
  }
    // Navega a la vista de datos del sensor
    EditarBebe(id: number){
      this.router.navigate(['/editbebe', id]);
    }
      // Navega a la vista de datos del sensor
      AsignarBebe(id: number) {
    this.router.navigate(['/asignarbebe', id]);
  }
  DatosBebe(id: number) {
    this.router.navigate(['/datosbebe', id]);
  }
  AgregarBebe() {
    this.router.navigate(['/createbebe']); // Asegúrate de que '/add-cuna' sea la ruta correcta
  }
}
