import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { DataManagementService } from 'src/app/services/dataManagement/data-management.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  constructor(private auth: AuthService,
              private router: Router,
              private dataService: DataManagementService) { }

  ngOnInit(): void {
    if (this.dataService.getUser()) {
      this.router.navigate(['calendar']);
      console.log('user Logged in');
    }
  }

  login() {
    console.log('logging in');
    this.auth.login(this.email, this.password).then((user) => {
      this.dataService.setUser(user);
      this.router.navigate(['calendar']);
    },
    (error) => {
      alert(error.message);
    });
  }

}
