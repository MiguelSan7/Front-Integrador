import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminsService } from '../service/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-create',
  templateUrl: './admin-create.component.html',
  styleUrls: ['./admin-create.component.scss']
})
export class AdminCreateComponent {
  adminForm: FormGroup;

  constructor(private fb: FormBuilder, private adminsService: AdminsService, private router: Router) {
    this.adminForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      nickname: ['', Validators.required],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      birthdate: ['', Validators.required],
      age: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.adminForm.valid) {
      const formValue = this.adminForm.value;
  
      // Convertir la fecha de nacimiento a un objeto Date
      const birthdate = new Date(formValue.birthdate);
  
      const formData = {
        ...formValue,
        birthdate: this.formatDate(birthdate), // Usa la función formatDate
      };
  
      console.log('Datos del formulario:', formData);
  
      this.adminsService.createAdmin(formData).subscribe(
        (response) => {
          console.log('Admin creado exitosamente:', response);
        },
        (error) => {
          console.error('Error al crear admin:', error);
        }
      );
    }
  }

  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript son 0-indexados
    const year = date.getFullYear();
  
    return `${day}-${month}-${year}`;
  }
}
