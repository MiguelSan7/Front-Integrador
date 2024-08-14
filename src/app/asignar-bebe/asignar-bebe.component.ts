// src/app/asignar-bebe/asignar-bebe.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CunasService } from '../service/cunas.service'; // Asegúrate de que este servicio esté disponible

@Component({
  selector: 'app-asignar-bebe',
  templateUrl: './asignar-bebe.component.html',
  styleUrls: ['./asignar-bebe.component.scss']
})
export class AsignarBebeComponent implements OnInit {
  cunas: any[] = [];
  selectedCuna: string = '';
  submitted = false;
  bebeId: number =0;

  constructor(
    private cunaService: CunasService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.bebeId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.bebeId) {
      this.loadCunas();
    } else {
      // Manejar caso en que no se pasa el ID del bebé
      this.router.navigate(['/bebes']);
    }
  }

  loadCunas() {
    this.cunaService.getCunasWithoutBebe().subscribe(
      (data) => {
        this.cunas = data;
      },
      (error) => {
        console.error('Error loading cunas:', error);
      }
    );
  }

  onSubmit() {
    this.submitted = true;
    if (this.selectedCuna) {
      this.cunaService.asignarBebe(this.selectedCuna, this.bebeId).subscribe(
        (response) => {
          alert('Bebé asignado a la cuna exitosamente');
          this.router.navigate(['/bebes']); // Redirigir a la lista de bebés o a otra página
        },
        (error) => {
          console.error('Error asignando bebe:', error);
        }
      );
    }
  }
}
