import { Component } from '@angular/core';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrls: ['./navbar-user.component.scss']
})
export class NavbarUserComponent {
  constructor(private loginService: LoginService, private router: Router) {}

  onLogout(): void {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
