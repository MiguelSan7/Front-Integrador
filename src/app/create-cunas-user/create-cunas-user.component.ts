import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CunasService } from '../service/cunas.service';
@Component({
  selector: 'app-create-cunas-user',
  templateUrl: './create-cunas-user.component.html',
  styleUrls: ['./create-cunas-user.component.scss']
})
export class CreateCunasUserComponent {
  numserie: string = '';
  apodo: string = '';
  cunaFound: boolean = false;
  cunaNotFound: boolean = false;

  constructor(private cunasService: CunasService, private router: Router) {}

  onSubmit() {
    this.cunaNotFound = false;


    this.cunasService.addCuna(this.numserie, this.apodo)
      .subscribe({
        next: (response) => {
          this.cunaFound = true;
          console.log(response)
          this.cunaNotFound = false;
          alert('Cuna agregada correctamente');
          this.router.navigate(['/cunasuser']); // Redirige a la lista de cunas
        },
        error: (error) => {
          if (error.status === 404) {
            this.cunaNotFound = true;
            this.cunaFound = false;
          } else {
            console.error('Error al agregar la cuna:', error);
          }
        }
      });
      
  }
  goToAddCuna() {
    this.router.navigate(['/cunasuser']); // Asegúrate de que '/add-cuna' sea la ruta correcta
  }
}
