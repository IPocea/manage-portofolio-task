import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IImagePagination, ITableFilters } from '@interfaces';
import { setFullAvailableFilters } from '@utils/index';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private http: HttpClient) {}

  uploadImage(formData: FormData, portofolioWebId: string): Observable<any> {
    return this.http.post<any>(
      environment.baseUrl + `images/upload/${portofolioWebId}`,
      formData
    );
  }

  getAllImagesOfPortofolio(
    portofolioWebId: string,
    filters: ITableFilters
  ): Observable<IImagePagination> {
    const filtersString = filters ? setFullAvailableFilters(filters) : '';
    return this.http.get<IImagePagination>(
      environment.baseUrl +
        `images/${portofolioWebId}/get-all-of-portofolio${filtersString}`
    );
  }

  deleteImage(
    portofolioWebId: string,
    imageId: string,
    filters: ITableFilters
  ): Observable<IImagePagination> {
    const filtersString = filters ? setFullAvailableFilters(filters) : '';
    return this.http.delete<IImagePagination>(
      environment.baseUrl +
        `images/${portofolioWebId}/${imageId}${filtersString}`
    );
  }

}
