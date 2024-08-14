import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TicketsService } from '../service/tickets.service';
@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss']
})
export class CreateTicketComponent implements OnInit {
  ticketForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ticketService: TicketsService,
    private router: Router
  ) {
    // Inicializar el formulario con validaciones
    this.ticketForm = this.fb.group({
      asunto: ['', [Validators.required, Validators.minLength(1)]],
      descripcion: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  ngOnInit(): void {}

  // Función para manejar el envío del formulario
  onSubmit(): void {
    if (this.ticketForm.valid) {
      this.ticketService.createTicket(this.ticketForm.value).subscribe(
        response => {
          // Redirigir a la página de tickets después de crear el ticket
          this.router.navigate(['/ticketsuser']);
        },
        error => {
          console.error('Error al crear el ticket', error);
        }
      );
    }
  }
}