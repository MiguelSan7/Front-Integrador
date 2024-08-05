import { Component, OnInit } from '@angular/core';
import { CunasService } from '../service/cunas.service';

@Component({
  selector: 'app-cunas-list',
  templateUrl: './cunas-list.component.html',
  styleUrls: ['./cunas-list.component.scss']
})
export class CunasListComponent implements OnInit {
  cunas: any[] = []; // Array para almacenar las cunas

  constructor(private cunasService: CunasService) {}

  ngOnInit(): void {
    this.loadCunas(); // Cargar las cunas al inicializar el componente
  }

  loadCunas(): void {
    this.cunasService.getCunas().subscribe(
      (data) => {
        this.cunas = data;
      },
      (error) => {
        console.error('Error al obtener las cunas', error);
      }
    );
  }

  editCuna(cuna: any): void {
    console.log('Editar cuna:', cuna);
    // Aquí iría la lógica para navegar a un formulario de edición
  }

  deleteCuna(id: string): void {
    this.cunasService.adminDestroy(id).subscribe(
      () => {
        this.cunas = this.cunas.filter(c => c.id !== id); // Eliminar del array local
      },
      (error) => {
        console.error('Error al eliminar la cuna', error);
      }
    );
  }
}
