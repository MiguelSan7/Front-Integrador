import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketService } from 'src/app/service/socket.service';
import { TicketsService } from 'src/app/service/tickets.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
})
export class TicketComponent implements OnInit, OnDestroy {
  
  tickets: any[] = [];

  constructor(
    private ticketsService: TicketsService,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    this.loadTickets();

    this.socketService.on('newTicket', (ticket) => {
      console.log('Nuevo ticket recibido:', ticket);
      this.tickets.push(ticket);
    });

    this.socketService.on('statusChanged', (updatedTicket) => {
      console.log('Estado del ticket actualizado:', updatedTicket);
      const index = this.tickets.findIndex(t => t.id === updatedTicket.id);
      if (index !== -1) {
        // Mantener la información del usuario
        this.tickets[index] = {
          ...this.tickets[index],
          ...updatedTicket,
          users: this.tickets[index].users
        };
      }
    });
  }

  ngOnDestroy(): void {
    this.socketService.disconnect();
  }

  loadTickets(): void {
    this.ticketsService.verTickets().subscribe({
      next: (response) => {
        console.log('Response:', response);
        if (Array.isArray(response)) {
          this.tickets = response;
        } else {
          console.warn('La respuesta no es un array, convirtiendo:', response);
          this.tickets = Object.values(response);
        }
      },
      error: (error) => {
        console.error('Error al obtener los tickets: ', error);
        if (error.status === 401) {
          console.error('Token inválido');
        }
      },
    });
  }

  isTicketEnEspera(ticket: any): boolean {
    return ticket.estado === 'en espera';
  }

  isTicketEnRevision(ticket: any): boolean {
    return ticket.estado === 'revision';
  }


  acceptTicket(ticket: any): void {
    if (this.isTicketEnEspera(ticket)) {
      this.ticketsService.changeStatus(ticket.id, 'revision').subscribe({
        next: (updatedTicket) => {
          console.log(`Estado del ticket ${ticket.id} actualizado a 'revision'`, updatedTicket);
          const index = this.tickets.findIndex(t => t.id === updatedTicket.id);
          if (index !== -1) {
            this.tickets[index] = {
              ...this.tickets[index],
              ...updatedTicket,
              users: this.tickets[index].users
            };
          }
        },
        error: (error) => {
          console.error('Error al actualizar el estado del ticket: ', error);
          if (error.error && error.error.error) {
            console.error('Mensaje de error del servidor:', error.error.error);
          }
        }
      });
    }
  }
  
  concludeTicket(ticket: any): void {
    if (this.isTicketEnRevision(ticket)) {
      this.ticketsService.changeStatus(ticket.id, 'concluida').subscribe({
        next: (updatedTicket) => {
          console.log(`Estado del ticket ${ticket.id} actualizado a 'concluida'`, updatedTicket);
          const index = this.tickets.findIndex(t => t.id === updatedTicket.id);
          if (index !== -1) {
            this.tickets[index] = {
              ...this.tickets[index],
              ...updatedTicket,
            };
          }
        },
        error: (error) => {
          console.error('Error al actualizar el estado del ticket: ', error);
          if (error.error && error.error.error) {
            console.error('Mensaje de error del servidor:', error.error.error);
          }
        }
      });
    }
  }
}