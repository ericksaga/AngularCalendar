import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataManagementService } from './services/dataManagement/data-management.service';
import { User } from './classes/user';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'AngularCalendar';
  user: User;
  userSub: Subscription;
  constructor(private dataService: DataManagementService,
              private auth: AuthService) {  }

  ngOnInit(): void {
    this.userSub = this.dataService.getUserObservable().subscribe((user) => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  logout(): void {
    this.auth.logout();
    this.dataService.setUser(undefined);
  }
}
