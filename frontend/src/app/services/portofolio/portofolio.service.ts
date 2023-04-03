import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  IPortofolioWeb,
  IPortofolioPagination,
  ITableFilters,
} from '@interfaces';
import { setFullAvailableFilters } from '@utils/index';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PortofolioService {
  constructor(private http: HttpClient) {}

  getAllVisible(): Observable<IPortofolioWeb[]> {
    return this.http.get<IPortofolioWeb[]>(environment.baseUrl + 'portofolios');
  }

  getAllPortofoliosWithPaginate(
    filters: ITableFilters
  ): Observable<IPortofolioPagination> {
    const filtersString = filters ? setFullAvailableFilters(filters) : '';
    return this.http.get<IPortofolioPagination>(
      environment.baseUrl + `portofolios/with-pagination${filtersString}`
    );
  }

  getOnePortofolio(portofolioWebId: string): Observable<IPortofolioWeb> {
    return this.http.get<IPortofolioWeb>(
      environment.baseUrl + `portofolios/${portofolioWebId}`
    );
  }

  createPortofolio(
    portofolioWeb: IPortofolioWeb,
    filters: ITableFilters
  ): Observable<IPortofolioPagination> {
    const filtersString = filters ? setFullAvailableFilters(filters) : '';
    return this.http.post<IPortofolioPagination>(
      environment.baseUrl + `portofolios/add${filtersString}`,
      portofolioWeb
    );
  }

  toggleVisibility(
    _id: string,
    isVisible: boolean,
    filters: ITableFilters
  ): Observable<IPortofolioPagination> {
    const filtersString = filters ? setFullAvailableFilters(filters) : '';
    return this.http.patch<IPortofolioPagination>(
      environment.baseUrl +
        `portofolios/${_id}/update-visibility${filtersString}`,
      { isVisible: isVisible }
    );
  }

  updatePortofolio(
    _id: string,
    updatedPortofolioWeb: IPortofolioWeb,
    filters: ITableFilters
  ): Observable<IPortofolioPagination> {
    const filtersString = filters ? setFullAvailableFilters(filters) : '';
    return this.http.patch<IPortofolioPagination>(
      environment.baseUrl +
        `portofolios/${_id}/edit-portofolio${filtersString}`,
      updatedPortofolioWeb
    );
  }

  deletePortofolio(
    _id: string,
    filters: ITableFilters
  ): Observable<IPortofolioPagination> {
    const filtersString = filters ? setFullAvailableFilters(filters) : '';
    return this.http.delete<IPortofolioPagination>(
      environment.baseUrl + `portofolios/${_id}${filtersString}`
    );
  }
}
