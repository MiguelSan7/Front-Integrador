import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  rol: string = '';

  constructor(private cookieService: CookieService) {}

  ngOnInit(): void {
    this.rol = this.cookieService.get('rol');
  }
}
