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
import { UsersComponent } from './users/users.component';
import { AdminCreateComponent } from './admin-create/admin-create.component';
import { AdminEditComponent } from './admin-edit/admin-edit.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { CunasUserComponent } from './cunas-user/cunas-user.component';
import { CreateCunasUserComponent } from './create-cunas-user/create-cunas-user.component';
import { EditCunasUserComponent } from './edit-cunas-user/edit-cunas-user.component';
import { MenuCunaComponent } from './menu-cuna/menu-cuna.component';
import { MostrarIndividualComponent } from './mostrar-individual/mostrar-individual.component';
import { MostrarTodosComponent } from './mostrar-todos/mostrar-todos.component';
import { HistorialComponent } from './historial/historial.component';
import { BebeComponent } from './bebe/bebe.component';
import { NavbarUserComponent } from './navbar-user/navbar-user.component';
import { TicketsUserComponent } from './tickets-user/tickets-user.component';
import { CreateBebeComponent } from './create-bebe/create-bebe.component';
import { EditBebeComponent } from './edit-bebe/edit-bebe.component';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { EditTicketComponent } from './edit-ticket/edit-ticket.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { AsignarBebeComponent } from './asignar-bebe/asignar-bebe.component';
import { RegisterComponent } from './register/register.component';
import { DatosBebeComponent } from './datos-bebe/datos-bebe.component';

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
    CunasEditComponent,
    UsersComponent,
    AdminCreateComponent,
    AdminEditComponent,
    AdminListComponent,
    CunasUserComponent,
    CreateCunasUserComponent,
    EditCunasUserComponent,
    MenuCunaComponent,
    MostrarIndividualComponent,
    MostrarTodosComponent,
    HistorialComponent,
    BebeComponent,
    NavbarUserComponent,
    TicketsUserComponent,
    CreateBebeComponent,
    EditBebeComponent,
    CreateTicketComponent,
    EditTicketComponent,
    NotAuthorizedComponent,
    AsignarBebeComponent,
    RegisterComponent,
    DatosBebeComponent
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