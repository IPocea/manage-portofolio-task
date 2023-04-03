import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, take } from 'rxjs';
import {
  LoginDataService,
  UserService,
} from '@services';
import { IUser } from '@interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  isLoading: boolean = true;
  user: IUser = null;
  loginDataSubscription: Subscription;
  pathName: string = '';

  constructor(
    private loginDataService: LoginDataService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginDataSubscription = this.loginDataService.loginData.subscribe(
      (data) => {
        this.user = data;
      }
    );
    this.pathName = window.location.pathname;
    this.getProfile();
  }

  private getProfile(): void {
    this.userService
      .getProfile()
      .pipe(take(1))
      .subscribe({
        next: (profile) => {
          this.user = profile;
          this.loginDataService.setNextLoggedUser(profile);
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
          if (!this.pathName.includes('/reset-password')) {
            this.router.navigate(['/home']);
          }
        },
      });
  }

  ngOnDestroy(): void {
    this.loginDataSubscription?.unsubscribe();
  }
}
