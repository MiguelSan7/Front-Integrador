import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CunasService } from '../service/cunas.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent implements OnInit {
  cunaId: string = '';
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
    this.cunaId = this.route.snapshot.paramMap.get('id') || '';
    this.token = this.cookieService.get('auth_token');
    this.loadHistorial();
  }

  loadHistorial() {
    this.historialService.getHistorial(this.cunaId, this.token).subscribe(data => {
      this.historial = data;
      this.totalItems = data.length;
    }, error => {
      console.error('Error loading historial:', error);
    });
  }

  filterByDate() {
    if (this.fechaInicio && this.fechaFin && new Date(this.fechaInicio) <= new Date(this.fechaFin)) {
      console.log(this.fechaInicio)
      console.log(this.fechaFin)

      this.historialService.getDataByCuna(this.cunaId, this.fechaInicio, this.fechaFin, this.token).subscribe(data => {
        this.historial = data;
        this.totalItems = data.length;
        this.currentPage = 1; // Reset page to 1 when filtering
      }, error => {
        console.error('Error filtering historial:', error);
      });
    } else {
      alert('La fecha de inicio no puede ser mayor que la fecha de fin, y ambas fechas deben ser válidas.');
    }
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
