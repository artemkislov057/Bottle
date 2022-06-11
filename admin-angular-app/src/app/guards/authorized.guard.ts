import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizedGuard implements CanActivate {
  constructor(
    private router: Router,
    private accountService: AccountService
  ) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return this.accountService.isAuthorized().pipe(
        map(user => {
          if (user.nickname != 'admin') {
            this.router.navigate(['']);
            return false;
          } else {
            return true;
          }
        }),
        catchError(() => {
          this.router.navigate(['']);
          return of(false);
        })
      );
    }
  
}
