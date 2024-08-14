import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CunasService } from '../service/cunas.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-edit-cunas-user',
  templateUrl: './edit-cunas-user.component.html',
  styleUrls: ['./edit-cunas-user.component.scss']
})
export class EditCunasUserComponent implements OnInit {
  cunaId: string = '';
  cuna: any = { apodo: '' };
  submitted: boolean = false;
  token: string = '';

  constructor(
    private cunaService: CunasService,
    private route: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.cunaId = this.route.snapshot.paramMap.get('id') || '';
    this.token = this.cookieService.get('auth_token');
    this.loadCuna();
  }

  loadCuna() {
    this.cunaService.getCunaById(this.cunaId, this.token).subscribe(data => {
      this.cuna = data;
    }, error => {
      console.error('Error loading cuna:', error);
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.cuna.apodo) {
      this.cunaService.updateCuna(this.cunaId, this.cuna.apodo, this.token).subscribe(response => {
        alert('Cuna actualizada correctamente');
        this.router.navigate(['/cunasuser']); // Redirige a la lista de cunas o a otra página relevante
      }, error => {
        console.error('Error updating cuna:', error);
      });
    }
  }
}