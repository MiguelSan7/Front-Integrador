import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CunasService } from '../service/cunas.service';

@Component({
  selector: 'app-cunas-list',
  templateUrl: './cunas-list.component.html',
  styleUrls: ['./cunas-list.component.scss']
})
export class CunasListComponent implements OnInit {
  cunas: any[] = []; // Array para almacenar las cunas

  constructor(private cunasService: CunasService, private router: Router) {}

  ngOnInit(): void {
    this.loadCunas(); // Cargar las cunas al inicializar el componente
  }

  loadCunas(): void {
    this.cunasService.getCunas().subscribe(
      (data) => {
        this.cunas = data;
      },
      (error) => {
        if (error.status === 401) {
          console.error('No autorizado: por favor inicie sesión de nuevo.');
          // Redirigir al usuario a la página de login
          this.router.navigate(['/login']);
        } else {
          console.error('Error al obtener las cunas', error);
        }
      }
    );
  }

  editCuna(cuna: any): void {
    this.router.navigate(['/cunas/edit', cuna.id]);
  }

  deleteCuna(id: string): void {
    this.cunasService.adminDestroy(id).subscribe(
      () => {
        this.cunas = this.cunas.filter(c => c.id !== id); // Eliminar del array local
      },
      (error) => {
        if (error.status === 401) {
          console.error('No autorizado: por favor inicie sesión de nuevo.');
          // Redirigir al usuario a la página de login
          this.router.navigate(['/login']);
        } else {
          console.error('Error al eliminar la cuna', error);
        }
      }
    );
  }
}
