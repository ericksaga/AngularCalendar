import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { DataManagementService } from 'src/app/services/dataManagement/data-management.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
              private fb: FormBuilder) { }

  ngOnInit(): void {
    if (this.dataService.getUser()) {
      this.router.navigate(['calendar']);
      console.log('user Logged in');
    }
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.minLength(4)]
    });
  }

  login() {
    console.log('logging in');
    this.auth.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value).then((user) => {
      this.dataService.setUser(user);
      this.router.navigate(['calendar']);
    },
    (error) => {
      alert(error.message);
    });
  }

}
