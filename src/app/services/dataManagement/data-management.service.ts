import { Injectable } from '@angular/core';
import { User } from 'src/app/classes/user';

@Injectable({
  providedIn: 'root'
})
export class DataManagementService {
  private user: User;
  private date: Date;
  constructor() { }

  getDate(): Date {
    return this.date;
  }

  setDate(newDate: Date) {
    this.date = newDate;
  }

  getUser(): User {
    return this.user;
  }

  setUser(newUser: User) {
    this.user = newUser;
  }
}
