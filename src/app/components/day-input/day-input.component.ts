import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database/database.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { DataManagementService } from 'src/app/services/dataManagement/data-management.service';
import { Costs } from 'src/app/classes/costs';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Day } from 'src/app/classes/day';

@Component({
  selector: 'app-day-input',
  templateUrl: './day-input.component.html',
  styleUrls: ['./day-input.component.css']
})
export class DayInputComponent implements OnInit {

  date: Date;
  costs: Array<Costs>;
  dayData: FormGroup;
  costData: FormGroup;
  today: Day;
  constructor(private db: DatabaseService,
              private router: Router,
              private dataService: DataManagementService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.date = this.dataService.getDate() ? this.dataService.getDate() : new Date();
    this.costs = new Array<Costs>();
    const reg = /^\d+$/;
    this.dayData = this.fb.group({
      gains: ['0', Validators.compose([Validators.required, Validators.pattern(reg)])],
      type1: ['0', Validators.compose([Validators.required, Validators.pattern(reg)])],
      type2: ['0', Validators.compose([Validators.required, Validators.pattern(reg)])],
      type3: ['0', Validators.compose([Validators.required, Validators.pattern(reg)])],
      type4: ['0', Validators.compose([Validators.required, Validators.pattern(reg)])]
    });
    this.costData = this.fb.group({
      desc: ['', Validators.required],
      val: ['', Validators.compose([Validators.required, Validators.pattern(reg)])]
    });
    if (!this.dataService.getUser()) {
      this.router.navigate(['']);
    } else {
      this.db.readDayInfo(this.date).subscribe((data: Day) => {
        if (data) {
          this.today = data;
          this.costs = data.cost ? data.cost : this.costs;
          this.dayData.setValue({
            gains: data.gains,
            type1: data.type1Clothes,
            type2: data.type2Clothes,
            type3: data.type3Clothes,
            type4: data.type4Clothes
          });
        } else {
          this.today = new Day();
        }
        this.today.date = this.date;
      });
    }
  }

  uploadDay() {
    this.today.gains = this.dayData.controls.gains.value;
    this.today.type1Clothes = this.dayData.controls.type1.value;
    this.today.type2Clothes = this.dayData.controls.type2.value;
    this.today.type3Clothes = this.dayData.controls.type3.value;
    this.today.type4Clothes = this.dayData.controls.type4.value;
    this.today.cost = this.costs;
    if (!this.today.created) {
      this.today.created = new Date();
      this.today.createdBy = this.dataService.getUser().email;
    }
    this.today.lastUpdated = new Date();
    this.today.lastUpdatedBy = this.dataService.getUser().email;
    this.db.addDayInfo(this.today).then(() => {
      this.router.navigate(['calendar']);
    });
  }

  addCost() {
    const cost = new Costs();
    cost.value = this.costData.controls.val.value;
    cost.details = this.costData.controls.desc.value;
    this.costs.push(cost);
    this.costData.controls.val.setValue('');
    this.costData.controls.desc.setValue('');
  }

  eraseCost(index: number) {
    this.costs.splice(index, 1);
  }

}
