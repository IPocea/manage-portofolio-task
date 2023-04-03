import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITokens, IUserLoginData } from '@interfaces';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient
  ) {}

  login(loginData: IUserLoginData): Observable<ITokens> {
    return this.http.post<ITokens>(
      environment.baseUrl + 'auth/login',
      loginData
    );
  }

  logout(): Observable<{ message: string }> {
    return this.http.get<{ message: string }>(
      environment.baseUrl + 'auth/logout'
    );
  }
}
