import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  private apiUrl = environment.apiUrl;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      nickname: ['', Validators.required],
      birthdate: ['', Validators.required],
      age: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formValue = this.registerForm.value;
      formValue.birthdate = this.formatDate(formValue.birthdate);

      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post<any>(`${this.apiUrl}/register`, formValue, { headers })
        .subscribe(
          response => {
            alert('¡Usuario registrado exitosamente!');
            this.router.navigate(['/login']);
          },
          error => {
            if (error.status === 422) {
              alert('Error de validación: ' + JSON.stringify(error.error.errors));
            } else {
              alert('Error interno del servidor');
            }
          }
        );
    } else {
      alert('Por favor, completa todos los campos requeridos correctamente.');
    }
  }
}
