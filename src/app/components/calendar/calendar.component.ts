import { Component, OnInit, DoCheck } from '@angular/core';
import { User } from 'src/app/classes/user';
import { Day } from 'src/app/classes/day';
import { CalendarSquare } from 'src/app/classes/calendar-square';
import { DatabaseService } from 'src/app/services/database/database.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router, NavigationExtras } from '@angular/router';
import { DataManagementService } from 'src/app/services/dataManagement/data-management.service';
import { Subject, Subscription } from 'rxjs';

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
  dateOnScreen: Date;
  endDay: number;
  monthResume: Day;
  date: Subject<Date>;
  dateSub: Subscription;
  monthCosts = 0;
  calendarDate: string;
  constructor(private db: DatabaseService,
              private router: Router,
              private dataService: DataManagementService) { }

  ngOnInit(): void {
    if (!this.dataService.getUser()) {
      this.router.navigate(['']);
    } else {
      this.date = new Subject<Date>();
      this.dateSub = this.date.subscribe((date) => {
        this.startCalendar(date);
        console.log(date);
        this.gatherDatafromDb(date);
        console.log(date);
        this.dateOnScreen = date;
        this.calendarDate = date.getFullYear().toString() + '/' + this.calendar[date.getMonth()].month;
      });
      const dat = new Date();
      this.date.next(new Date(dat.getFullYear(), dat.getMonth()));
    }
  }

  dateInput(day: number) {
    console.log(day);
    const date: Date = new Date();
    const dateToEnter: Date = new Date(date.getFullYear(), date.getMonth(), day);
    this.dataService.setDate(dateToEnter);
    this.router.navigate(['today']);
  }

  startCalendar(stDate: Date) {
    this.monthResume = new Day();
    this.calendarSq = new Array<Array<CalendarSquare>>();
    for (let x = 0; x < 7; x++) {
      this.calendarSq.push(new Array<CalendarSquare>());
    }
    this.endDay = this.calendar[stDate.getMonth()].days;
    let st = 1;
    if (stDate.getMonth() === 1 && stDate.getFullYear() % 4 === 0) {
      this.endDay++;
    }
    st -= stDate.getDay();
    // console.log(st);
    for (let x = 0; x < 42; x++) {
      let sq = new CalendarSquare();
      const p = Math.floor(x / 7);
      sq.index = x + st;
      if (x + st <= 0 || x + st > this.endDay) {
        sq.active = -1;
      } else {
        sq.active = 0;
      }
      this.calendarSq[p].push(sq);
    }
    console.log(this.calendar[stDate.getMonth()].month);
  }

  gatherDatafromDb(stDate: Date) {
    this.db.getMonthInfo(stDate, this.endDay).subscribe((data: Array<Day>) => {
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

  moveDate(month: number) {
    console.log(month);
    console.log(this.dateOnScreen.getMonth());
    let year = this.dateOnScreen.getFullYear();
    month += this.dateOnScreen.getMonth();
    if (month > 11) {
      month = 0;
      year++;
    } else if (month < 0) {
      month = 11;
      year--;
    }
    console.log(month);
    this.date.next(new Date(year, month));
  }

}
