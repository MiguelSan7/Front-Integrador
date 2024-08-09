// src/app/components/ticket-list/ticket-list.component.ts

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
    this.ticketsService.verTickets().subscribe({
      next: (tickets) => {
        this.tickets = tickets;
        console.log('Tickets: ', tickets);
      },
      error: (error) => {
        console.error('Error al obtener los tickets: ', error);
        if (error.status === 401) {
          console.error('Token inválido');
        }
      },  
    });

    this.socketService.on('tickets', (data) => {
      this.tickets = data;
    });
  }

  ngOnDestroy(): void {
    this.socketService.disconnect();
  }
}
