import { Component, OnInit } from '@angular/core';
import { CunasService } from '../service/cunas.service';
import { Cuna } from '../intefaces/cuna';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cunas-user',
  templateUrl: './cunas-user.component.html',
  styleUrls: ['./cunas-user.component.scss']
})
export class CunasUserComponent  implements OnInit {
  cunas: Cuna[] = [];

  constructor(private cunasService: CunasService, private router:Router) { }

  ngOnInit(): void {
    this.cunasService.getCunasUser().subscribe(
      (data) => {
        this.cunas = data;
      },
      (error) => {
        console.error('Error al obtener las cunas:', error);
      }
    );
  }
  goToEditCuna(cunaId: number): void {
    this.router.navigate(['/editcunasuser', cunaId]);
  }

  // Navega a la vista de datos del sensor
  goToSensorData(cunaId: number): void {
    this.router.navigate(['/menu', cunaId]);
  }
  
  goToAddCuna() {
    this.router.navigate(['/createcunauser']); // Asegúrate de que '/add-cuna' sea la ruta correcta
  }
}
