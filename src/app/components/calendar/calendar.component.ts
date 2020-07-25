import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user';
import { Day } from 'src/app/classes/day';
import { CalendarSquare } from 'src/app/classes/calendar-square';
import { DatabaseService } from 'src/app/services/database/database.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router, NavigationExtras } from '@angular/router';
import { DataManagementService } from 'src/app/services/dataManagement/data-management.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  calendar = [
    {month: 'enero', days: 31},
    {month: 'febrero', days: 28},
    {month: 'marzo', days: 31},
    {month: 'abril', days: 30},
    {month: 'mayo', days: 31},
    {month: 'junio', days: 30},
    {month: 'julio', days: 31},
    {month: 'agosto', days: 31},
    {month: 'septiempre', days: 30},
    {month: 'octubre', days: 31},
    {month: 'noviembre', days: 30},
    {month: 'diciembre', days: 31},
  ];
  calendarSq: Array<Array<CalendarSquare>>;
  monthResume: Day;
  monthCosts = 0;
  constructor(private db: DatabaseService,
              private router: Router,
              private dataService: DataManagementService) { }

  ngOnInit(): void {
    this.monthResume = new Day();
    this.calendarSq = new Array<Array<CalendarSquare>>();
    for (let x = 0; x < 7; x++) {
      this.calendarSq.push(new Array<CalendarSquare>());
    }
    const date: Date = new Date();
    const dateSt: Date = new Date(date.getFullYear(), date.getMonth());
    let lmt: number = this.calendar[date.getMonth()].days;
    let st = 1;
    if (date.getMonth() === 1 && date.getFullYear() % 4 === 0) {
      lmt++;
    }
    st -= dateSt.getDay();
    console.log(st);
    for (let x = 0; x < 42; x++) {
      let sq = new CalendarSquare();
      const p = Math.floor(x / 7);
      sq.index = x + st;
      if (x + st <= 0 || x + st > lmt) {
        sq.active = -1;
      } else {
        sq.active = 0;
      }
      this.calendarSq[p].push(sq);
    }
    if (!this.dataService.getUser()) {
      this.router.navigate(['']);
    } else {
      this.db.getMonthInfo(date, lmt).subscribe((data: Array<Day>) => {
        for (let sqArray of this.calendarSq) {
          for (let sq of sqArray) {
            const pos = data.findIndex((day) => day.created.getDate() === sq.index);
            if ( pos !== -1) {
              sq.active = 1;
              this.monthResume.gains += data[pos].gains;
              this.monthResume.type1Clothes += data[pos].type1Clothes;
              this.monthResume.type2Clothes += data[pos].type2Clothes;
              for (let ct of data[pos].cost) {
                this.monthCosts += ct.value;
              }
            }
          }
        }
        console.log(this.calendarSq);
      });
    }
  }

  dateInput(day: number) {
    console.log(day);
    const date: Date = new Date();
    const dateToEnter: Date = new Date(date.getFullYear(), date.getMonth(), day);
    this.dataService.setDate(dateToEnter);
    this.router.navigate(['today']);
  }

}
