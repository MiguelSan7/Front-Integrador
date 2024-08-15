import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CunasComponent } from './cunas/cunas.component';
import { AuthGuard } from './guards/auth.guard';
import { CunasListComponent } from './cunas-list/cunas-list.component';
import { CunasCreateComponent } from './cunas-create/cunas-create.component';
import { CunasEditComponent } from './cunas-edit/cunas-edit.component';
import { TicketComponent } from './tickets/tickets.component';
import { UsersComponent } from './users/users.component';
import { AdminCreateComponent } from './admin-create/admin-create.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { CunasUserComponent } from './cunas-user/cunas-user.component';
import { CreateCunasUserComponent } from './create-cunas-user/create-cunas-user.component';
import { EditCunasUserComponent } from './edit-cunas-user/edit-cunas-user.component';
import { BebeComponent } from './bebe/bebe.component';
import { MenuCunaComponent } from './menu-cuna/menu-cuna.component';
import { MostrarIndividualComponent } from './mostrar-individual/mostrar-individual.component';
import { MostrarTodosComponent } from './mostrar-todos/mostrar-todos.component';
import { CreateBebeComponent } from './create-bebe/create-bebe.component';
import { EditBebeComponent } from './edit-bebe/edit-bebe.component';
import { HistorialComponent } from './historial/historial.component';
import { TicketsUserComponent } from './tickets-user/tickets-user.component';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { AuthRoleGuard } from './auth-role.guard';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { EditTicketComponent } from './edit-ticket/edit-ticket.component';
import { AsignarBebeComponent } from './asignar-bebe/asignar-bebe.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'cunas', component: CunasComponent,
    canActivate: [AuthRoleGuard],
    data: { roles: [1] }},
  { path: 'cunas/create', component: CunasCreateComponent,
    canActivate: [AuthRoleGuard],
    data: { roles: [1] }},
  { path: 'cunas/list', component: CunasListComponent,
    canActivate: [AuthRoleGuard],
    data: { roles: [1] } },
  { path: 'cunas/edit/:id', component: CunasEditComponent ,
    canActivate: [AuthRoleGuard],
    data: { roles: [1] }},
  { path: 'tickets', component: TicketComponent,
    canActivate: [AuthRoleGuard],
    data: { roles: [1] }},
  { path: 'users', component: UsersComponent,
    canActivate: [AuthRoleGuard],
    data: { roles: [1] }},
  { path: 'users/create', component: AdminCreateComponent,
    canActivate: [AuthRoleGuard],
    data: { roles: [1] }},
  { path: 'users/edit/:id', component: AdminCreateComponent,
    canActivate: [AuthRoleGuard],
    data: { roles: [1] }},
  { path: 'users/list', component: AdminListComponent,
    canActivate: [AuthRoleGuard],
    data: { roles: [1] }},
  { path: 'not-authorized', component: NotAuthorizedComponent},
  { path: 'cunasuser', component: CunasUserComponent,
    canActivate: [AuthRoleGuard],
    data: { roles: [3] } },
  { path: 'createcunauser', component: CreateCunasUserComponent,
    canActivate: [AuthRoleGuard],
    data: { roles: [3] } },
  { path: 'editcunasuser/:id', component: EditCunasUserComponent,
    canActivate: [AuthRoleGuard],
    data: { roles: [3] } },
  { path: 'bebes', component: BebeComponent,
    canActivate: [AuthRoleGuard],
    data: { roles: [3] } },
  { path: 'createbebe', component: CreateBebeComponent,
    canActivate: [AuthRoleGuard],
    data: { roles: [3] } },
  { path: 'editbebe/:id', component: EditBebeComponent,
    canActivate: [AuthRoleGuard],
    data: { roles: [3] } },
  { path: 'menu/:id', component: MenuCunaComponent,
    canActivate: [AuthRoleGuard],
    data: { roles: [3] }},
  { path: 'individual/:id/:sensor', component: MostrarIndividualComponent,
    canActivate: [AuthRoleGuard],
    data: { roles: [3] }},
  { path: 'todos/:id', component: MostrarTodosComponent,
    canActivate: [AuthRoleGuard],
    data: { roles: [3] }},
  { path: 'historial/:id', component: HistorialComponent,
    canActivate: [AuthRoleGuard],
    data: { roles: [3] } },
  { path: 'ticketsuser', component: TicketsUserComponent,
    canActivate: [AuthRoleGuard],
    data: { roles: [3] } },
  { path: 'createticket', component: CreateTicketComponent,
    canActivate: [AuthRoleGuard],
    data: { roles: [3] } },
  { path: 'editticket/:id', component: EditTicketComponent,
    canActivate: [AuthRoleGuard],
    data: { roles: [3] } },
    { path: 'asignarbebe/:id', component: AsignarBebeComponent,
      canActivate: [AuthRoleGuard],
      data: { roles: [3] } },



    {path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
