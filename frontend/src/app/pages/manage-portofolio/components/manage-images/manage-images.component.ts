import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  IImage,
  IImagePagination,
  IPortofolioWeb,
  ITableFilters,
  IUser,
} from '@interfaces';
import { ImageService, LoginDataService, NotificationService } from '@services';
import { UploadImageComponent } from '../upload-image/upload-image.component';
import { finalize, take } from 'rxjs';
import { ConfirmationDialogComponent } from '@shared/components/confirmation-dialog/confirmation-dialog.component';
import { environment } from '../../../../../environments/environment';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { getImgSrc } from '@utils/get-image-src';

@Component({
  selector: 'app-manage-images',
  templateUrl: './manage-images.component.html',
  styleUrls: ['./manage-images.component.scss'],
})
export class ManageImagesComponent implements OnInit {
  portofolioWeb: IPortofolioWeb = null;
  imagePagination: IImagePagination = null;
  currentUser: IUser = null;
  isLoading: boolean = false;
  length: number;
  pageIndex: number;
  pageSize: number;
  pageSizeOptions: number[] = [];
  searchValue: string = '';
  typingTimer: ReturnType<typeof setTimeout>;
  typingInt: number = 350;
  filters: ITableFilters = null;
  imgUrl: string = null;
  uploadRef: MatDialogRef<UploadImageComponent>;
  confirmationDialogRef: MatDialogRef<ConfirmationDialogComponent>;
  imageDialogRef: MatDialogRef<ImageDialogComponent>;
  selectedImage: IImage = null;
  config = {
    MIME_types_accepted: 'image/*',
    is_multiple_selection_allowed: true,
    data: null,
  };

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ManageImagesComponent>,
    private loginDataService: LoginDataService,
    private notificationService: NotificationService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.loginDataService.getLoggedUser();
    this.config.data = { ...this.portofolioWeb };
    this.getImagePagination(this.filters);
  }

  applySearchFilter(): void {
    this.clearTimeout();
    this.typingTimer = setTimeout(
      this.searchByValue.bind(this),
      this.typingInt
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  clearTimeout(): void {
    clearTimeout(this.typingTimer);
  }

  clearSearchValue(): void {
    this.searchValue = '';
    this.searchByValue();
  }

  deleteImage(image: IImage): void {
    this.isLoading = true;
    this.confirmAndDelete(image);
  }

  handlePageChange(ev: any): void {
    this.resetFiltersObj();
    this.filters = {
      pageIndex: ev.pageIndex.toString(),
      pageSize: ev.pageSize.toString(),
    };
    this.requestFilteredData(this.filters);
  }

  showImage(image: IImage): void {
    this.resetSrcAndSelectedImage();
    const screenWidth: number = window.screen.availWidth;
    if (screenWidth >= 900) {
      this.imgUrl = getImgSrc(image.path);
      this.selectedImage = image;
    } else {
      this.imageDialogRef = this.dialog.open(ImageDialogComponent, {
        disableClose: true,
        width: '100vw',
      });
      this.imageDialogRef.componentInstance.selectedImage = image;
      this.imageDialogRef.afterClosed().subscribe((res) => {});
    }
  }

  requestFilteredData(filters: ITableFilters): void {
    this.isLoading = true;
    this.getImagePagination(filters);
  }

  openDragAndDrop(): void {
    this.uploadRef = this.dialog.open(UploadImageComponent, {
      disableClose: true,
      minWidth: '50vw',
    });
    this.uploadRef.componentInstance.config = this.config;
    this.uploadRef.afterClosed().subscribe((res) => {
      if (res?.event === 'Upload Finished') {
        this.notificationService.info('The files were uploaded successfully');
        this.requestFilteredData(this.filters);
      }
    });
  }

  private confirmAndDelete(image: IImage): void {
    this.confirmationDialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: true,
    });
    this.confirmationDialogRef.componentInstance.title = 'Delete Image';
    this.confirmationDialogRef.componentInstance.content =
      'Are you sure you want to delete this image?';
    this.confirmationDialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.removeImage(this.portofolioWeb._id, image._id);
      } else {
        this.isLoading = false;
      }
    });
  }

  private getImagePagination(filters: ITableFilters): void {
    this.imageService
      .getAllImagesOfPortofolio(this.portofolioWeb._id, filters)
      .pipe(
        take(1),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (imagePagination) => {
          this.imagePagination = imagePagination;
          this.setPaginator(this.imagePagination);
        },
      });
  }

  private removeImage(protofolioWebId: string, imageId: string): void {
    this.imageService
      .deleteImage(protofolioWebId, imageId, this.filters)
      .pipe(
        take(1),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (imagePagination) => {
          this.imagePagination = imagePagination;
          this.resetSrcAndSelectedImage();
          this.setPaginator(this.imagePagination);
        },
        error: (err) => {
          this.notificationService.error(err.error.message);
        },
      });
  }

  private setPaginator(imagePagination: IImagePagination): void {
    this.pageIndex = imagePagination.pageIndex;
    this.pageSize = imagePagination.pageSize;
    this.length = imagePagination.totalItems;
    this.pageSizeOptions = environment.pageSizeOptions;
  }

  private resetFiltersObj(): void {
    this.filters = null;
  }

  private resetSrcAndSelectedImage(): void {
    this.imgUrl = null;
    this.selectedImage = null;
  }

  private searchByValue(): void {
    this.resetFiltersObj();
    this.filters = {
      pageIndex: '0',
      pageSize: this.pageSize.toString(),
    };
    if (this.searchValue.trim()) {
      this.filters.searchValue = this.searchValue.trim();
    }
    this.requestFilteredData(this.filters);
  }
}
