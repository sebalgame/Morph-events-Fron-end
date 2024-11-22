import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private auth: AuthService,
              private router:Router){
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.auth.isAuthenticated() && this.auth.getAuthoritie() == 'ADMIN'){
      return true;
    }
    console.log('this.auth.isAuthenticated()' , this.auth.isAuthenticated());
    console.log('this.auth.getAuthoritie()' , this.auth.getAuthoritie());

    if(this.auth.isAuthenticated()){
      if( this.auth.getAuthoritie() === 'ADMIN'){
        this.router.navigate(['ciudad/listar']);
      }else{
        this.router.navigate(['cuenta/bievenidos']);
      }

    }else{
      this.router.navigate(['inicio-sesion/loguearse']);
    }

    return false;
  }
}
