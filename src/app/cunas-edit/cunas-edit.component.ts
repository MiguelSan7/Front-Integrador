import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CunasService } from '../service/cunas.service';

@Component({
  selector: 'app-cunas-edit',
  templateUrl: './cunas-edit.component.html',
  styleUrls: ['./cunas-edit.component.scss']
})
export class CunasEditComponent implements OnInit {
  cuna: any = {
    numserie: '',
    apodo: ''
  };

  errorMessages: string[] = [];

  constructor(
    private cunasService: CunasService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cunasService.showCuna(id).subscribe(
        (data) => {
          this.cuna = data;
        },
        (error) => {
          console.error('Error al obtener los datos de la cuna:', error);
          this.errorMessages.push('Error al obtener los datos de la cuna.');
        }
      );
    }
  }

  onSubmit(): void {
    this.cunasService.adminUpdate(this.cuna.id, this.cuna).subscribe(
      (response) => {
        console.log('Cuna actualizada con éxito:', response);
        this.router.navigate(['/cunas/list']);
      },
      (error) => {
        this.handleError(error);
      }
    );
  }

  handleError(error: any): void {
    this.errorMessages = []; // Limpiar mensajes de error previos
    if (error.error && error.error.errors) {
      error.error.errors.forEach((err: any) => {
        this.errorMessages.push(err.message); // Agregar cada mensaje de error
      });
    } else {
      this.errorMessages.push('Error inesperado al actualizar la cuna.');
    }
  }
}
