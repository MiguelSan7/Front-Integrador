import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketsService } from '../service/tickets.service';

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.scss']
})
export class EditTicketComponent implements OnInit {
  ticketForm: FormGroup;
  ticketId: string | null = null;
  successMessage: string | null = null; // Nueva propiedad para el mensaje de éxito

  constructor(
    private fb: FormBuilder,
    private ticketService: TicketsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.ticketForm = this.fb.group({
      asunto: ['', [Validators.required, Validators.minLength(1)]],
      descripcion: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  ngOnInit(): void {
    this.ticketId = this.route.snapshot.paramMap.get('id');
    if (this.ticketId) {
      this.ticketService.getTicket(this.ticketId).subscribe(
        ticket => {
          this.ticketForm.patchValue({
            asunto: ticket.asunto,
            descripcion: ticket.descripcion
          });
        },
        error => {
          console.error('Error al obtener el ticket', error);
          this.router.navigate(['/ticketsuser']);
        }
      );
    }
  }

  onSubmit(): void {
    if (this.ticketForm.valid && this.ticketId) {
      this.ticketService.updateTicket(this.ticketId, this.ticketForm.value).subscribe(
        response => {
          // Mostrar mensaje de éxito y resetear el formulario
          this.successMessage = 'El ticket ha sido actualizado exitosamente.';
          setTimeout(() => {
            this.successMessage = null;
            this.router.navigate(['/ticketsuser']);
          }, 3000); // Redirigir después de 3 segundos
        },
        error => {
          console.error('Error al actualizar el ticket', error);
        }
      );
    }
  }
}
