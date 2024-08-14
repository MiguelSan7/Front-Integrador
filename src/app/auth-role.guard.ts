import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthRoleGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {

    const rol = this.getRoleFromCookie();

    // Verificar si el usuario tiene un rol permitido para la ruta
    if (route.data['roles'] && route.data['roles'].indexOf(rol) === -1) {
      // Redirigir si no tiene el rol permitido
      this.router.navigate(['/not-authorized']);
      return false;
    }

    return true;
  }

  private getRoleFromCookie(): number | null {
    const match = document.cookie.match(new RegExp('(^| )rol=([^;]+)'));
    if (match) {
      return parseInt(match[2], 10);
    }
    return null;
  }
}
