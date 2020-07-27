import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Day } from '../../classes/day';
import { User } from '../../classes/user';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  dayCollectionName = 'M&M';
  userCollectionName = 'users';
  getDocName = ((date) => {
    return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;
  });
  constructor(private firestr: AngularFirestore) { }

  addDayInfo(data: Day) {
    const docName = this.getDocName(data.created);
    this.firestr.collection<Day>(this.dayCollectionName).doc(docName).set(data);
  }

  readDayInfo(day: Date) {
    return this.firestr.collection<Day>(this.dayCollectionName).doc(this.getDocName(day)).valueChanges();
  }

  getMonthInfo(date: Date, end: number) {
    const monthInit: Date = new Date(date);
    const monthEnd: Date = new Date(date);
    monthInit.setDate(1);
    monthEnd.setDate(end);
    const refInit = this.getDocName(monthInit);
    const refEnd = this.getDocName(monthEnd);
    return this.firestr.collection<Day>(this.dayCollectionName, ref => ref.where('created', '>=', refInit).where('created', '<=', refEnd))
    .valueChanges();
  }

  addUser(user: User) {
    this.firestr.collection<User>(this.userCollectionName).add(user);
  }

  searchUser(email: string) {
    return this.firestr.collection<User>(this.userCollectionName, ref => ref.where('email', '==', email)).valueChanges();
  }
}
