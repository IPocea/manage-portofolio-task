import { Component, OnInit } from '@angular/core';
import { IPortofolioPagination, ITableFilters } from '@interfaces';
import { PortofolioService, StorageService } from '@services';
import { take } from 'rxjs';

@Component({
  selector: 'app-manage-portofolio',
  templateUrl: './manage-portofolio.component.html',
  styleUrls: ['./manage-portofolio.component.scss'],
})
export class ManagePortofolioComponent implements OnInit {
  portofoliosPagination: IPortofolioPagination = null;
  isLoading: boolean = false;
  defaultFilters: ITableFilters = {
    pageIndex: '0',
    pageSize: '10',
  };
  constructor(
    private storageService: StorageService,
    private portofolioService: PortofolioService
  ) {}

  ngOnInit(): void {
    const defaultPageSize = this.storageService.getItem('pageSize')
      ? (this.storageService.getItem('pageSize') as string)
      : '10';
    this.defaultFilters.pageSize = defaultPageSize;
    this.getPortofolios(this.defaultFilters);
  }

  private getPortofolios(filters: ITableFilters): void {
    this.portofolioService
      .getAllPortofoliosWithPaginate(filters)
      .pipe(take(1))
      .subscribe({
        next: (portofoliosPagination) => {
          this.portofoliosPagination = portofoliosPagination;
        },
        error: (err) => {},
      });
  }

  requestCompanies(ev: ITableFilters): void {
    this.getPortofolios(ev);
  }
}
