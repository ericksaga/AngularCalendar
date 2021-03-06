import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// firebase modules
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { environment } from '../environments/environment';
import { LoginComponent } from './components/login/login.component';
import { DatabaseService } from './services/database/database.service';
import { AuthService } from './services/auth/auth.service';
import { CalendarComponent } from './components/calendar/calendar.component';
import { DayInputComponent } from './components/day-input/day-input.component';
import { RegisterComponent } from './components/register/register.component';
import { YearSelectorComponent } from './components/year-selector/year-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CalendarComponent,
    DayInputComponent,
    RegisterComponent,
    YearSelectorComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    DatabaseService,
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
