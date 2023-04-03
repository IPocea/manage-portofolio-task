import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordService {
  private http: HttpClient;
  constructor(
    private handler: HttpBackend,
  ) {
    this.http = new HttpClient(this.handler);
  }

  getResetToken(email: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      environment.baseUrl + 'auth/reset-token-password',
      { email: email }
    );
  }

  checkResetToken(resetToken: string): Observable<{ message: string }> {
    return this.http.get<{ message: string }>(
      environment.baseUrl + 'auth/reset-token-password',
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resetToken}`,
        }),
      }
    );
  }

  resetPassword(
    password: string,
    resetToken: string
  ): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      environment.baseUrl + 'auth/reset-password',
      { password: password },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resetToken}`,
        }),
      }
    );
  }
}
