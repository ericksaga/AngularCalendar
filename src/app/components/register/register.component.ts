import { Component, OnInit } from '@angular/core';
import { DataManagementService } from 'src/app/services/dataManagement/data-management.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/classes/user';
import { VirtualTimeScheduler } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private dataService: DataManagementService,
              private router: Router,
              private auth: AuthService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    if (!this.dataService.getUser()) {
      this.router.navigate(['']);
    }
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      email: ['', Validators.compose([Validators.required, Validators.email])]
    });
  }

  register(): void {
    const user: User = new User();
    user.email = this.registerForm.value.email;
    user.name = this.registerForm.value.name;
    this.auth.register(user, this.registerForm.value.password).then(() => {
      this.auth.logout();
      this.dataService.setUser(undefined);
      this.router.navigate(['/login']);
    });
  }

}
