import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CunasService } from '../service/cunas.service';

@Component({
  selector: 'app-cunas-create',
  templateUrl: './cunas-create.component.html',
  styleUrls: ['./cunas-create.component.scss']
})
export class CunasCreateComponent {
  cuna: any = {
    numserie: '',
    apodo: ''
  };

  errorMessages: string[] = []; // Para almacenar mensajes de error

  constructor(private cunasService: CunasService, private router:Router) {}

  onSubmit(): void {
    if (this.cuna.numserie.length > 5) {
      this.errorMessages = ['El número de serie debe tener un máximo de 5 caracteres.'];
      return;
    }

    this.cunasService.Create(this.cuna).subscribe(
      (response) => {
        console.log('Cuna creada con éxito:', response);
        // Aquí puedes redirigir al usuario o limpiar el formulario
        this.cuna = { numserie: ''}; // Limpiar el formulario
        this.errorMessages = []; // Limpiar mensajes de error
        this.router.navigate(['/cunas/list']);
      },
      (error) => {
        this.handleError(error); // Manejar el error y mostrar mensajes
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
      this.errorMessages.push('Error inesperado al crear la cuna.');
    }
  }
}