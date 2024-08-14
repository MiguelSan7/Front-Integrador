import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../service/tickets.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tickets-user',
  templateUrl: './tickets-user.component.html',
  styleUrls: ['./tickets-user.component.scss']
})
export class TicketsUserComponent implements OnInit {
  tickets: any[] = [];
  filteredTickets: any[] = [];
  filter: string = 'todos';

  constructor(private ticketService: TicketsService, private router:Router) {}

  ngOnInit(): void {
    this.ticketService.verTicketsPersonal().subscribe((data) => {
      this.tickets = data;
      this.applyFilter();
    });
  }

  applyFilter(): void {
    if (this.filter === 'todos') {
      this.filteredTickets = this.tickets;
    } else {
      this.filteredTickets = this.tickets.filter(ticket => ticket.estado === this.filter);
    }
  }

  onFilterChange(filterValue: string): void {
    if (filterValue === 'todos') {
      this.filteredTickets = this.tickets;
    } else {
      this.filteredTickets = this.tickets.filter(ticket => ticket.estado === filterValue);
    }
  }
  getEstadoClass(estado: string) {
    switch (estado) {
      case 'en espera':
        return 'text-yellow-500';
      case 'revision':
        return 'text-blue-500';
      case 'concluida':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  }
  editTicket(id: number): void {
    this.router.navigate(['/editticket', id]);
  }

  addTicket(): void {
    this.router.navigate(['/createticket']);
  }
}