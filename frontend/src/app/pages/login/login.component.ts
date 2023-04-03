import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AuthService,
  LoginDataService,
  NotificationService,
  StorageService,
  UserService,
} from '@services';
import { cleanForm } from '@utils';
import { take } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoading: boolean = true;
  loginForm: FormGroup;
  isLogging: boolean = false;
  isPasswordHidden: boolean = true;
  previousUrl: string = null;
  currentUrl: string = null;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router,
    private storageService: StorageService,
    private userService: UserService,
    private loginDataService: LoginDataService,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
    this.isLoading = false;
    this.getProfile();
  }

  login(): void {
    this.isLogging = true;
    this.isLoading = true;
    this.doLogin();
  }

  private doLogin(): void {
    cleanForm(this.loginForm);
    this.authService
      .login(this.loginForm.value)
      .pipe(take(1))
      .subscribe({
        next: (tokens) => {
          this.storageService.setItem('tokens', tokens);
          this.getProfile();
        },
        error: (err) => {
          this.loginDataService.setNextLoggedUser(null);
          this.isLoading = false;
          this.isLogging = false;
          this.notificationService.error(
            err.error.message || 'An unexpected error has occured'
          );
        },
      });
  }

  private getProfile(): void {
    this.userService
      .getProfile()
      .pipe(take(1))
      .subscribe({
        next: (profile) => {
          this.loginDataService.setNextLoggedUser(profile);
          this.router.navigate(['/manage-portofolio']);
        },
        error: (err) => {
          this.isLoading = false;
          this.isLogging = false;
        },
      });
  }

}
