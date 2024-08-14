import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  token:string = ''
  loginForm: FormGroup;
  verificationForm: FormGroup;
  isVerificationStage: boolean = false;
  uid: string = '';
  loginError: string | null = null;
  verificationError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {
    this.loginForm = this.fb.group({
     uid: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
    this.verificationForm = this.fb.group({
      code: ['', [Validators.required]]
    });
  }
ngOnInit(): void {
  
}
  onSubmitLogin(): void {
    if (this.loginForm.valid) {
      const { uid, password } = this.loginForm.value;
      this.loginService.login(uid, password).subscribe(
        (response: any) => {
          this.isVerificationStage = true;
          this.uid = uid; // Asumiendo que el uid es el email
          this.loginError = null;
        },
        (error) => {
          this.loginError = error; // Error recibido del servicio
          console.error('Login error:', error);
        }
      );
    }
  }

  onSubmitVerification(): void {
    if (this.verificationForm.valid) {
      const { code } = this.verificationForm.value;
      this.loginService.verify(this.uid, code).subscribe(
        (response: any) => {
          console.log(response)
          // Guarda el token en una cookie
          document.cookie = `token=${response.token};path=/`;
          // Redirigir a la página deseada
          document.cookie = `rol=${response.user.role_id};path=/`;

          this.router.navigate(['/dashboard']);
          this.verificationError = null;
        },
        (error) => {
          this.verificationError = error; // Error recibido del servicio
          console.error('Verification error:', error);
        }
      );
    }
  }
}
