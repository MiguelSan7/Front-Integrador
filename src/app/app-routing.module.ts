import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CunasComponent } from './cunas/cunas.component';
import { AuthGuard } from './guards/auth.guard';
import { CrudFormComponent } from './crud-form/crud-form.component';
import { CunasListComponent } from './cunas-list/cunas-list.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'cunas', component: CunasComponent},
  { path: ':operation', component: CrudFormComponent },
  { path: ':operation/:id', component: CrudFormComponent },
  { path: 'cunas-list', component: CunasListComponent },
  {path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
