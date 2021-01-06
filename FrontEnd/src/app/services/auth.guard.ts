import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router :Router, private TokenService:TokenService){ }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   const token = this.TokenService.GetToken(); 
   if(token){ 
     return true ; 
   }
   else { 
     this.router.navigate(['/']); 
     return false ; 
   }
  }
  
}
