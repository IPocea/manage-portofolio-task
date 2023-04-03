import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  AuthService,
  LoginDataService,
  NotificationService,
  StorageService,
} from '@services';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { finalize, take } from 'rxjs';
import { IUser } from '@interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() user: IUser;
  isLoading: boolean = false;
  confirmDialogRef: MatDialogRef<ConfirmationDialogComponent>;

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private storageService: StorageService,
    private loginDataService: LoginDataService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {}

  logout(): void {
    this.isLoading = true;
    this.confirmAndLogout();
  }

  private confirmAndLogout(): void {
    this.confirmDialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: true,
    });
    this.confirmDialogRef.componentInstance.title = 'Logout';
    this.confirmDialogRef.componentInstance.content =
      'Are you sure you want to logout?';
    this.confirmDialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.doLogout();
      } else {
        this.isLoading = false;
      }
    });
  }

  private doLogout(): void {
    this.authService
      .logout()
      .pipe(
        take(1),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: () => {
          this.storageService.removeItem('tokens');
          this.loginDataService.setNextLoggedUser(null);
          this.router.navigate(['/home']);
        },
        error: (e) => {
          this.notificationService.error(
            e.error.message || 'An unexpected error has occured'
          );
        },
      });
  }
}
