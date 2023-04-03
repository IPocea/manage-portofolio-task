import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { StorageService } from '@services';

@Injectable({
  providedIn: 'root',
})
export class NonAuth implements CanActivate {
  constructor(private router: Router, private storageService: StorageService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const tokens = this.storageService.getItem('tokens');
    if (tokens) {
      this.router.navigate(['/manage-portofolio']);
      return false;
    }
    return true;
  }
}
