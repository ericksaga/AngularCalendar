import { Component, OnInit } from '@angular/core';
import { DataManagementService } from 'src/app/services/dataManagement/data-management.service';

@Component({
  selector: 'app-year-selector',
  templateUrl: './year-selector.component.html',
  styleUrls: ['./year-selector.component.css']
})
export class YearSelectorComponent implements OnInit {

  monthsMatrix = [['Jan', 'Feb', 'Mar', 'Apr'], ['May', 'Jun', 'Jul', 'Agu'], ['Sep', 'Oct', 'Nov', 'Dec']];
  date: Date;
  constructor(private dataService: DataManagementService) { }

  ngOnInit(): void {
    this.date = this.dataService.getDate();
    this.date = this.date ? this.date : new Date();
  }

  selectMonth(num): void {
    this.dataService.setDate(new Date(this.date.getFullYear(), num));
  }

  selectYear(num): void {
    this.date = new Date(this.date.getFullYear() + num, this.date.getMonth());
  }
}
