import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CunasService } from '../service/cunas.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-datos-bebe',
  templateUrl: './datos-bebe.component.html',
  styleUrls: ['./datos-bebe.component.scss']
})
export class DatosBebeComponent implements OnInit{
  BebeId:string = ''
  historial: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  token: string = '';
  fechaInicio: string = '';
  fechaFin: string = '';
  constructor(
    private historialService: CunasService,
    private route: ActivatedRoute,
    private cookieService: CookieService
  ) {}
  ngOnInit(): void {
    this.BebeId = this.route.snapshot.paramMap.get('id') || '';
    this.token = this.cookieService.get('auth_token');
    this.loadHistorial();
  }
  loadHistorial() {
    this.historialService.getDatosBebe(this.BebeId, this.token).subscribe(data => {
      this.historial = data;
      this.totalItems = data.length;
    }, error => {
      console.error('Error loading historial:', error);
    });
  }
  get paginatedHistorial() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.historial.slice(start, end);
  }

  nextPage() {
    if ((this.currentPage * this.itemsPerPage) < this.totalItems) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
