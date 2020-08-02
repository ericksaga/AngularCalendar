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
  constructor(private firestr: AngularFirestore) { }

  getDocName(date: Date): string {
    const d = (date.getDate() >= 10) ? '' : '0';
    const m = (date.getMonth() >= 10) ? '' : '0';
    return `${date.getFullYear()}-${m}${date.getMonth()}-${d}${date.getDate()}`;
  }
  addDayInfo(data: Day) {
    console.log(data);
    const docName = this.getDocName(data.date);
    return this.firestr.collection<Day>(this.dayCollectionName).doc(docName).set({
      date: typeof(data.date) === 'string' ? data.date : this.getDocName(data.date),
      type1Clothes: data.type1Clothes,
      type2Clothes: data.type2Clothes,
      type3Clothes: data.type3Clothes,
      type4Clothes: data.type4Clothes,
      sendToBank: data.sendToBank,
      gains: data.gains,
      cost: JSON.parse(JSON.stringify(data.cost)),
      createdBy: data.createdBy,
      created: typeof(data.created) === 'string' ? data.created : this.getDocName(data.created),
      lastUpdatedBy: data.lastUpdatedBy,
      lastUpdated: typeof(data.lastUpdated) === 'string' ? data.lastUpdated : this.getDocName(data.lastUpdated),
    });
  }

  readDayInfo(day: Date) {
    return this.firestr.collection<Day>(this.dayCollectionName).doc(this.getDocName(day)).valueChanges();
  }

  getMonthInfo(date: Date, end: number) {
    const monthInit: Date = new Date(date);
    const monthEnd: Date = new Date(date);
    monthInit.setDate(1);
    monthInit.setHours(0, 0, 0, 0);
    monthEnd.setDate(end);
    monthEnd.setHours(23, 59, 59, 999);
    return this.firestr.collection<Day>(this.dayCollectionName, ref =>
      ref.where('date', '>=', this.getDocName(monthInit)).where('date', '<=', this.getDocName(monthEnd)))
    .valueChanges();
  }

  addUser(user: User) {
    this.firestr.collection<User>(this.userCollectionName).add(JSON.parse(JSON.stringify(user)));
  }

  searchUser(email: string) {
    return this.firestr.collection<User>(this.userCollectionName, ref => ref.where('email', '==', email)).valueChanges();
  }
}
