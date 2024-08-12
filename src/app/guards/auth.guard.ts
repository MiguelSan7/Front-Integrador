import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../service/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isLoggedIn = this.loginService.isLoggedIn();
    const isLoginRoute = state.url === '/login';

    if (isLoggedIn && isLoginRoute) {
      this.router.navigate(['/dashboard']);
      return false;
    }

    if (isLoggedIn || isLoginRoute) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
