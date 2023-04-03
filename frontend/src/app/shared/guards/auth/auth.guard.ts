import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { LoginDataService, StorageService } from '@services';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private storageService: StorageService,
    private loginDataService: LoginDataService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const tokens = this.storageService.getItem('tokens');

    if (tokens) {
      return true;
    }
    this.loginDataService.setNextLoggedUser(null);
    this.router.navigate(['/login']);
    return false;
  }
}
