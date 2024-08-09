import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './service/login.service';
import { CookieService } from 'ngx-cookie-service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CunasComponent } from './cunas/cunas.component';
import { CunasListComponent } from './cunas-list/cunas-list.component';
import { TicketComponent } from './tickets/tickets.component';
import { CunasCreateComponent } from './cunas-create/cunas-create.component';
import { FormsModule } from '@angular/forms';
import { CunasEditComponent } from './cunas-edit/cunas-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    DashboardComponent,
    CunasComponent,
    CunasListComponent,
    TicketComponent,
    CunasCreateComponent,
    CunasEditComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [LoginService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }