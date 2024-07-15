import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (event.url === '/login' && this.loginService.isLoggedIn()) {
          this.router.navigate(['/dashboard']); // Redirige al dashboard si está logueado e intenta acceder al login
        }
      }
    });
  }
}
