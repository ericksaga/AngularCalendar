import { Injectable } from '@angular/core';
import { User } from 'src/app/classes/user';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataManagementService {
  private user: User;
  private date: Date;
  private userObserver: Subject<User>;
  private dateObserver: Subject<Date>;
  constructor() {
    this.userObserver = new Subject<User>();
    this.dateObserver = new Subject<Date>();
   }

  getDate(): Date {
    return this.date;
  }

  setDate(newDate: Date) {
    this.date = newDate;
    this.dateObserver.next(newDate);
  }

  getUser(): User {
    return this.user;
  }

  setUser(newUser: User) {
    this.user = newUser;
    this.userObserver.next(newUser);
  }

  getUserObservable(): Observable<User> {
    return this.userObserver;
  }

  getDateObservable(): Observable<Date> {
    return this.dateObserver;
  }
}
