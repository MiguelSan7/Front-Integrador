import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  loginForm: FormGroup;
  verificationForm: FormGroup;
  isVerificationStage: boolean = false;
  uid: string = '';

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

  onSubmitLogin(): void {
    if (this.loginForm.valid) {
      const { uid, password } = this.loginForm.value;
      this.loginService.login(uid, password).subscribe(
        (response: any) => {
          this.isVerificationStage = true;
          this.uid = uid; // Asumiendo que el uid es el email
        },
        (error) => {
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
          // Guarda el token en una cookie
          document.cookie = `token=${response.token};path=/`;
          // Redirigir a la página deseada
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.error('Verification error:', error);
        }
      );
    }
  }
}
