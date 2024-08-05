import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CunasService } from '../service/cunas.service';

@Component({
  selector: 'app-crud-form',
  templateUrl: './crud-form.component.html',
  styleUrls: ['./crud-form.component.scss'],
})
export class CrudFormComponent {
  operation: string = '';
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private cunasService: CunasService
  ) {
    this.form = this.fb.group({
      numserie: ['', [Validators.required, Validators.maxLength(5)]],
      apodo: ['', Validators.required], // Apodo aún está aquí para otras operaciones
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.operation = params.get('operation') || '';
      this.initializeForm();
    });
  }

  initializeForm(): void {
    if (this.operation === 'create') {
      this.form.reset();
    } else if (['update', 'show', 'delete'].includes(this.operation)) {
      this.loadCunaData();
    }
  }

  loadCunaData(): void {
    // Lógica para cargar datos de una cuna existente si es necesario
  }

  onSubmit(): void {
    if (this.form.valid) {
      if (this.operation === 'create') {
        // Solo enviamos el numserie para crear
        const cunaData = { numserie: this.form.value.numserie };
        this.cunasService.adminCreate(cunaData).subscribe(
          (response) => {
            console.log('Cuna creada exitosamente:', response);
            // Opcional: redirigir o notificar al usuario sobre el éxito
          },
          (error) => {
            console.error('Error al crear cuna:', error);
          }
        );
      }
      // Añadir lógica para otras operaciones como 'update', 'delete', etc.
    }
  }

  getButtonText(operation: string): string {
    switch (operation) {
      case 'create':
        return 'Crear';
      case 'update':
        return 'Actualizar';
      case 'delete':
        return 'Eliminar';
      default:
        return 'Submit';
    }
  }
}
