import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {
  IPortofolioWeb,
  IPortofolioPagination,
  IStatusChoices,
  ITableFilters,
  IUser,
} from '@interfaces';
import { NotificationService, PortofolioService } from '@services';
import { cleanForm } from '@utils/index';
import { finalize, take } from 'rxjs';

@Component({
  selector: 'app-add-edit-portofolio',
  templateUrl: './add-edit-portofolio.component.html',
  styleUrls: ['./add-edit-portofolio.component.scss'],
})
export class AddEditPortofolioComponent implements OnInit {
  portofolioWeb: IPortofolioWeb = null;
  currentUser: IUser = null;
  filters: ITableFilters = null;
  isLoading: boolean = false;
  addEditPortofolioWebForm: FormGroup;
  addEditPortofolioWebBtnMessage: string = 'Add Portofolio';
  portofolioStatusChoices: IStatusChoices[] = [
    { value: true, viewValue: 'Visibile' },
    { value: false, viewValue: 'Hidden' },
  ];
  constructor(
    public dialogRef: MatDialogRef<AddEditPortofolioComponent>,
    private fb: FormBuilder,
    private portofolioService: PortofolioService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.addEditPortofolioWebBtnMessage = this.portofolioWeb
      ? 'Edit Website'
      : 'Add Website to portofolio';
    this.setPortofolioForm();
  }

  private setPortofolioForm(): void {
    if (this.portofolioWeb) {
      this.addEditPortofolioWebForm = this.fb.group({
        name: [this.portofolioWeb.name, [Validators.required]],
        description: [this.portofolioWeb.description, [Validators.required]],
        portofolioWebUrl: [this.portofolioWeb.portofolioWebUrl, [Validators.required]],
        isVisible: [this.portofolioWeb.isVisible, [Validators.required]],
        addedBy: [this.portofolioWeb.addedBy],
      });
    } else {
      this.addEditPortofolioWebForm = this.fb.group({
        name: [null, [Validators.required]],
        description: [null, [Validators.required]],
        portofolioWebUrl: [null, [Validators.required]],
        isVisible: [true, [Validators.required]],
        addedBy: [this.currentUser],
      });
    }
  }

  addEditPortofolioWeb(): void {
    this.isLoading = true;
    this.addEditPortofolioWebBtnMessage = this.portofolioWeb
      ? 'Is editing...'
      : 'Is adding...';
    cleanForm(this.addEditPortofolioWebForm);
    if (this.portofolioWeb) {
      this.editPortofolio(
        this.portofolioWeb._id,
        this.addEditPortofolioWebForm.value
      );
    } else {
      this.createPortofolio(this.addEditPortofolioWebForm.value);
    }
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }

  private createPortofolio(portofolio: IPortofolioWeb): void {
    this.portofolioService
      .createPortofolio(portofolio, this.filters)
      .pipe(
        take(1),
        finalize(() => {
          this.isLoading = false;
          this.addEditPortofolioWebBtnMessage = this.portofolioWeb
            ? 'Edit Website'
            : 'Add Website to portofolio';
        })
      )
      .subscribe({
        next: (portofolioData: IPortofolioPagination) => {
          this.dialogRef.close({
            event: 'Add Portofolio Web',
            portofolioData: portofolioData,
          });
        },
        error: (err) => {
          this.notificationService.error(
            err.error.message ||
              'An unexpected error has occured. Please refresh the page and try again'
          );
        },
      });
  }

  private editPortofolio(portofolioId: string, portofolio: IPortofolioWeb): void {
    this.portofolioService
      .updatePortofolio(portofolioId, portofolio, this.filters)
      .pipe(
        take(1),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (portofolioData: IPortofolioPagination) => {
          this.dialogRef.close({
            event: 'Edit Portofolio Web',
            portofolioData: portofolioData,
          });
        },
        error: (err) => {
          this.notificationService.error(
            err.error.message ||
              'An unexpected error has occured. Please refresh the page and try again'
          );
        },
      });
  }
}
