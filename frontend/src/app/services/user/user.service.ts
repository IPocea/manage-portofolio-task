import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '@interfaces';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getProfile(): Observable<IUser> {
    return this.http.get<IUser>(environment.baseUrl + 'profile');
  }

  createAccount(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(environment.baseUrl + 'registration', user);
  }
}
