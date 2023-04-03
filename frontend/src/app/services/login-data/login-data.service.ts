import { Injectable } from '@angular/core';
import { IUser } from '@interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginDataService {
  user: IUser = null;
  loginData: BehaviorSubject<IUser>;

  constructor() {
    this.loginData = new BehaviorSubject(this.user);
  }

  setNextLoggedUser(user: IUser) {
    this.loginData.next(user);
  }

  getLoggedUser() {
    return this.loginData.value;
  }
}
