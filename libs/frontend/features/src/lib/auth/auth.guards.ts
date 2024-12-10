import { Injectable, OnDestroy } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  ActivatedRoute,
} from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { IUserIdentity, UserRole } from '@avans-nx-workshop/shared/api';

/**
 * Verifies that user is logged in before navigating to routes.
 *
 */
@Injectable()
export class LoggedInAuthGuard implements CanActivate, CanActivateChild {
  //
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    console.log('canActivate LoggedIn');
    return this.authService.currentUser$.pipe(
      map((user: IUserIdentity | undefined) => {
        if (user && user.token) {
          return true;
        } else {
          console.log('not logged in, reroute to /login');
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    console.log('canActivateChild LoggedIn');
    return this.canActivate();
  }
}

/**
 * Verifies that user is logged in as admin before navigating to routes.
 *
 */
@Injectable()
export class LoggedInAsAdminAuthGuard implements CanActivate {
  //
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    console.log('canActivate LoggedInAsAdmin');
    return this.authService.currentUser$.pipe(
      map((user: IUserIdentity | undefined) => {
        if (user && user.token && user.role == UserRole.Admin) {
          return true;
        } else {
          console.log('not logged in as admin, reroute to /dashboard');
          this.router.navigate(['/']);
          return false;
        }
      })
    );
  }
}

/**
 * Verifies that user is editing his own data before navigating to routes.
 *
 */
@Injectable()
export class UserEditOwnDataAuthGuard implements CanActivate, OnDestroy{
  //
  constructor(private authService: AuthService, private router: Router) {}

  subs!: Subscription;
  userId?: string;

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    console.log('canActivate UserEditOwnData');

    const userId = route.paramMap.get('id')
    return this.authService.currentUser$.pipe(
      map((user: IUserIdentity | undefined) => {

        if (user && userId != null && userId == user._id) {
          return true;
        } else {
          console.log('Not your data, reroute to /dashboard');
          this.router.navigate(['/']);
          return false;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
