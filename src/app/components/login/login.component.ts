import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { DataManagementService } from 'src/app/services/dataManagement/data-management.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database/database.service';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private auth: AuthService,
              private router: Router,
              private dataService: DataManagementService,
              private fb: FormBuilder,
              private db: DatabaseService) { }

  ngOnInit(): void {
    this.auth.getUser().subscribe((user) => {
      if (user) {
        this.db.searchUser(user.email).subscribe((userObj: Array<User>) => {
          this.dataService.setUser(userObj[0]);
          this.router.navigate(['calendar']);
          console.log('user Logged in');
        });
      }
    });
    if (this.dataService.getUser()) {
      this.router.navigate(['calendar']);
      console.log('user Logged in');
    }
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.minLength(4)]
    });
    this.loginForm.controls.email.valueChanges.subscribe((val: string) => val.trim());
  }

  login() {
    console.log('logging in');
    this.auth.login(this.loginForm.controls.email.value.toLowerCase(), this.loginForm.controls.password.value).then((user) => {
      this.dataService.setUser(user);
      this.router.navigate(['calendar']);
    },
    (error) => {
      alert(error.message);
    });
  }

}
