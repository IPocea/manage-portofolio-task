import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { ConfirmedValidator } from '@shared/custom-validators/confirmed.validator';
import { finalize, take } from 'rxjs/operators';
import { UserService } from '@services';
import { NotificationService } from '@services';
import { Router } from '@angular/router';
import { IUser } from '@interfaces';
import { getPasswordToolTip, cleanForm } from '@utils/form-group';
import { emailRegExp, passwordRegExp } from '@utils/regexp';

@Component({
  selector: 'referer-me-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  @ViewChild(FormGroupDirective)
  createAccountFormDirective: FormGroupDirective;
  isPasswordHidden: boolean = true;
  isAdding: boolean = false;
  createAccountForm: FormGroup;
  emailPattern: RegExp = emailRegExp();
  passwordPattern: RegExp = passwordRegExp();
  passwordToolTip: string = getPasswordToolTip();

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createAccountForm = this.fb.group(
      {
        firstName: [null, [Validators.required]],
        lastName: [null, [Validators.required]],
        email: [
          null,
          [Validators.required, Validators.pattern(this.emailPattern), ,],
        ],
        website: [null],
        password: [
          null,
          [Validators.required, Validators.pattern(this.passwordPattern), ,],
        ],
        confirmPassword: [null, [Validators.required]],
      },
      {
        validators: ConfirmedValidator('password', 'confirmPassword'),
      }
    );
  }

  createAccount(): void {
    this.isAdding = true;
    this.createUser();
  }

  get f(): FormGroup['controls'] {
    return this.createAccountForm.controls;
  }

  private createUser(): void {
    cleanForm(this.createAccountForm);
    this.userService
      .createAccount(this.createAccountForm.value)
      .pipe(
        take(1),
        finalize(() => {
          this.isAdding = false;
        })
      )
      .subscribe({
        next: (user: IUser) => {
          this.createAccountFormDirective.resetForm();
          this.notificationService.info('The account was created successfully');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.notificationService.error(err.error.message);
        },
      });
  }
}