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


const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'cunas', component: CunasComponent},
  { path: 'cunas/create', component: CunasCreateComponent},
  { path: 'cunas/list', component: CunasListComponent },
  { path: 'cunas/edit/:id', component: CunasEditComponent },
  { path: 'tickets', component: TicketComponent},
  { path: 'users', component: UsersComponent},
  { path: 'users/create', component: AdminCreateComponent},
  { path: 'users/edit/:id', component: AdminCreateComponent},
  { path: 'users/list', component: AdminListComponent},
    {path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
