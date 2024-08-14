import { Component , OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BebesService } from '../service/bebes.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-edit-bebe',
  templateUrl: './edit-bebe.component.html',
  styleUrls: ['./edit-bebe.component.scss']
})
export class EditBebeComponent implements OnInit {
  bebe: any = { nombres: '', apellidos: '', sexo: '' };
  submitted = false;
  bebeId: string = '';
token:string = '';
  constructor(
    private bebeService: BebesService,
    private route: ActivatedRoute,
    private router: Router,
    private cookieService:CookieService
  ) {}

  ngOnInit(): void {
    this.token = this.cookieService.get('auth_token')
    this.bebeId = this.route.snapshot.paramMap.get('id') || '';
    this.loadBebe();
  }

  loadBebe() {
    this.bebeService.getBebe(this.bebeId,this.token).subscribe(
      (data) => {
        this.bebe = data;
      },
      (error) => {
        console.error('Error loading bebe:', error);
      }
    );
  }

  onSubmit() {
    this.submitted = true;
    if (this.bebe.nombres && this.bebe.apellidos && this.bebe.sexo) {
      this.bebeService.updateBebe(this.bebeId, this.bebe,this.token).subscribe(
        (response) => {
          alert('Bebé actualizado correctamente');
          this.router.navigate(['/bebes']); // Redirigir a la lista de bebés o a otra página
        },
        (error) => {
          console.error('Error updating bebe:', error);
        }
      );
    }
  }
}