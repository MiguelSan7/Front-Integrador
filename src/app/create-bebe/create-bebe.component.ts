import { Component, OnInit } from '@angular/core';
import { BebesService } from '../service/bebes.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-bebe',
  templateUrl: './create-bebe.component.html',
  styleUrls: ['./create-bebe.component.scss']
})
export class CreateBebeComponent implements OnInit {
  bebe: any = {
    nombres: '',
    apellidos: '',
    sexo: ''
  };
  submitted = false;
  token: string = '';

  constructor(
    private bebesService: BebesService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.token = this.cookieService.get('auth_token');
  }

  onSubmit() {
    this.submitted = true;

    if (this.bebe.nombres && this.bebe.apellidos && this.bebe.sexo) {
      this.bebesService.createBebe(this.bebe, this.token).subscribe(response => {
        alert('Bebé creado exitosamente');
        this.router.navigate(['/bebes']); // Redirigir a la lista de bebés o a donde quieras
      }, error => {
        console.error('Error al crear bebé:', error);
        alert('Error al crear bebé');
      });
    }
  }
}
