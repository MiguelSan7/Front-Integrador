import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private loginService: LoginService, private router: Router) {}

  onLogout(): void {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
