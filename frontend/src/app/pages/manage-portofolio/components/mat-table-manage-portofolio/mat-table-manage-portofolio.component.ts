import { BooleanInput } from '@angular/cdk/coercion';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChange,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IPortofolioWeb, IPortofolioPagination, ITableFilters, IUser } from '@interfaces';
import {
  LoginDataService,
  NotificationService,
  PortofolioService,
  StorageService,
} from '@services';
import { ConfirmationDialogComponent } from '@shared/components/confirmation-dialog/confirmation-dialog.component';
import { environment } from '../../../../../environments/environment';
import { finalize, take } from 'rxjs';
import { AddEditPortofolioComponent } from '../add-edit-portofolio/add-edit-portofolio.component';
import { ManageImagesComponent } from '../manage-images/manage-images.component';

@Component({
  selector: 'app-mat-table-manage-portofolio',
  templateUrl: './mat-table-manage-portofolio.component.html',
  styleUrls: ['./mat-table-manage-portofolio.component.scss'],
})
export class MatTableManagePortofolioComponent implements OnInit {
  @Input() portofoliosPagination: IPortofolioPagination;
  @Output() sendFilters = new EventEmitter<ITableFilters>();
  @ViewChild(MatSort) sort: MatSort;
  isLoading: boolean = false;
  length: number;
  pageIndex: number;
  pageSize: number;
  pageSizeOptions: number[] = [];
  showFirstLastButtons: BooleanInput = true;
  searchValue: string = '';
  typingTimer: ReturnType<typeof setTimeout>;
  typingInt: number = 350;
  dataSource = new MatTableDataSource<IPortofolioWeb>();
  displayedColumns = [];
  tableDialogRef: MatDialogRef<AddEditPortofolioComponent>;
  confirmDialogRef: MatDialogRef<ConfirmationDialogComponent>;
  manageImageDialogRef: MatDialogRef<ManageImagesComponent>;
  filters: ITableFilters = null;
  currentUser: IUser = null;
  constructor(
    public dialog: MatDialog,
    private notificationService: NotificationService,
    private portofolioService: PortofolioService,
    private storageService: StorageService,
    private loginDataService: LoginDataService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.loginDataService.getLoggedUser();
    const data = { ...this.portofoliosPagination };
    this.checkIfDataAndUpdate(data);
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource<IPortofolioWeb>(
      this.portofoliosPagination.data
    );
    this.setPaginator(this.portofoliosPagination);
    // in order to sort by letter and not let Capital letters to less points on compare
    // we need on string to make all lower case
    this.dataSource.sortingDataAccessor = (
      data: any,
      sortHeaderId: string
    ): string => {
      if (typeof data[sortHeaderId] === 'string') {
        return data[sortHeaderId].toLocaleLowerCase();
      }
      return data[sortHeaderId];
    };
  }

  ngOnChanges(changes: SimpleChange): void {
    const data = { ...this.portofoliosPagination };
    this.checkIfDataAndUpdate(data);
    this.setPaginator(this.portofoliosPagination);
    this.dataSource.data = changes['portofoliosPagination'].currentValue.data;
    this.isLoading = false;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getEventValue($event: any): string {
    return ($event.target as HTMLInputElement).value;
  }

  applySearchFilter(): void {
    this.clearTimeout();
    this.typingTimer = setTimeout(
      this.searchByValue.bind(this),
      this.typingInt
    );
  }

  clearTimeout(): void {
    clearTimeout(this.typingTimer);
  }

  clearSearchValue(): void {
    this.searchValue = '';
    this.searchByValue();
  }

  deletePortofolio(portofolioWebId: string): void {
    this.isLoading = true;
    this.confirmAndDelete(portofolioWebId);
  }

  handlePageChange(ev: any): void {
    this.storageService.setItem('pageSize', ev.pageSize);
    this.resetFiltersObj();
    this.filters = {
      pageIndex: ev.pageIndex.toString(),
      pageSize: ev.pageSize.toString(),
    };
    if (this.sort.active || this.sort.direction !== '') {
      this.filters.sortBy = this.sort.active;
      this.filters.sortDirection = this.sort.direction;
    }
    if (this.searchValue.trim()) {
      this.filters.searchValue = this.searchValue.trim();
    }
    this.requestFilteredData(this.filters);
  }

  sortData(sort: Sort) {
    this.resetFiltersObj();
    this.filters = {
      pageIndex: '0',
      pageSize: this.pageSize.toString(),
    };
    if (sort.active || sort.direction !== '') {
      this.filters.sortBy = sort.active;
      this.filters.sortDirection = sort.direction;
    }
    if (this.searchValue.trim()) {
      this.filters.searchValue = this.searchValue.trim();
    }
    this.requestFilteredData(this.filters);
  }

  togglePortofolioVisibility(portofolioWeb: IPortofolioWeb): void {
    this.isLoading = true;
    this.toogleVisibility(portofolioWeb);
  }

  requestFilteredData(fitlers: ITableFilters): void {
    this.isLoading = true;
    this.sendFilters.emit(fitlers);
  }

  openTableForm(actionType: string, portofolioWeb?: IPortofolioWeb) {
    switch (actionType) {
      case 'add-portofolio-web':
        this.tableDialogRef = this.dialog.open(AddEditPortofolioComponent, {
          disableClose: true,
        });
        this.tableDialogRef.componentInstance.currentUser = this.currentUser;
        this.tableDialogRef.componentInstance.filters = this.filters;
        this.tableDialogRef.afterClosed().subscribe((res) => {
          if (res.event === 'Add Portofolio Web') {
            this.checkIfDataAndUpdate(res.portofolioData);
            this.setPaginator(res.portofolioData);
            this.resetSort();
            this.resetFiltersObj();
            this.filters = {
              pageIndex: '0',
              pageSize: this.pageSize.toString(),
            };
            this.dataSource.data = res.portofolioData.data;
            this.notificationService.info('The portofolio web was added');
          }
        });
        break;
      case 'edit-portofolio-web':
        this.tableDialogRef = this.dialog.open(AddEditPortofolioComponent, {
          disableClose: true,
        });
        this.tableDialogRef.componentInstance.currentUser = this.currentUser;
        this.tableDialogRef.componentInstance.filters = this.filters;
        this.tableDialogRef.componentInstance.portofolioWeb = portofolioWeb;
        this.tableDialogRef.afterClosed().subscribe((res) => {
          if (res?.event === 'Edit Portofolio Web') {
            this.checkIfDataAndUpdate(res.portofolioData);
            this.setPaginator(res.portofolioData);
            this.dataSource.data = res.portofolioData.data;
            this.notificationService.info(
              'The portofolio web was successfully edited'
            );
          }
        });
        break;
      default:
        break;
    }
  }

  openManageImage(portofolioWeb: IPortofolioWeb) {
    this.manageImageDialogRef = this.dialog.open(ManageImagesComponent, {
      disableClose: true,
      width: '100%',
      height: '80vh'
    })
    this.manageImageDialogRef.componentInstance.portofolioWeb = portofolioWeb
  }

  private confirmAndDelete(portofolioWebId: string): void {
    this.confirmDialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: true,
    });
    this.confirmDialogRef.componentInstance.title = 'Delete Website';
    this.confirmDialogRef.componentInstance.content =
      'Are you sure you want to remvoe this website from portofolio?';
    this.confirmDialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.removeItem(portofolioWebId);
      } else {
        this.isLoading = false;
      }
    });
  }

  private checkIfDataAndUpdate(
    portofoliosPagination: IPortofolioPagination
  ): void {
    if (portofoliosPagination?.data.length) {
      const dataKeys = Object.keys(portofoliosPagination.data[0]);
      dataKeys.splice(dataKeys.indexOf('_id'), 1);
      dataKeys.splice(dataKeys.indexOf('__v'), 1);
      dataKeys.unshift('crt.');
      dataKeys.push('_id');
      this.displayedColumns = dataKeys;
    } else {
      this.displayedColumns = ['No website found'];
    }
  }

  private paginateAfterUpdate(
    portofolioData: IPortofolioPagination,
    message: string
  ): void {
    this.checkIfDataAndUpdate(portofolioData);
    this.setPaginator(portofolioData);
    this.dataSource.data = portofolioData.data;
    this.notificationService.info(message);
  }

  private searchByValue(): void {
    this.resetSort();
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

  private setPaginator(portofoliosPagination: IPortofolioPagination): void {
    this.pageIndex = portofoliosPagination.pageIndex;
    this.pageSize = portofoliosPagination.pageSize;
    this.length = portofoliosPagination.totalItems;
    this.pageSizeOptions = environment.pageSizeOptions;
  }

  private resetSort(): void {
    if (this.sort) {
      this.sort.active = '';
      this.sort.direction = '';
      this.sort._stateChanges.next();
      this.dataSource.sort = this.sort;
    }
  }

  private resetFiltersObj(): void {
    this.filters = null;
  }

  private removeItem(portofolioWebId: string): void {
    this.portofolioService
      .deletePortofolio(portofolioWebId, this.filters)
      .pipe(
        take(1),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (portofolioData) => {
          this.paginateAfterUpdate(portofolioData, 'The website was removed from portofolio');
        },
        error: (err) => {
          this.notificationService.error(err.error.message);
        },
      });
  }

  private toogleVisibility(portofolioWeb: IPortofolioWeb): void {
    this.portofolioService
      .toggleVisibility(portofolioWeb._id, !portofolioWeb.isVisible, this.filters)
      .pipe(
        take(1),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (portofoliosData) => {
          this.paginateAfterUpdate(
            portofoliosData,
            `The visibility was changed to ${
              !portofolioWeb.isVisible ? 'visible' : 'hidden'
            }`
          );
        },
        error: (err) => {
          this.notificationService.error(
            'An unexpected error has occured. Please refresh the page and try again'
          );
        },
      });
  }
}
