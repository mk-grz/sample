import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import {FormsModule,ReactiveFormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OtpGeneratorComponent } from './otp-generator/otp-generator.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { from } from 'rxjs';
import { LoginComponent } from './login/login.component';
import { SearchHospitalComponent } from './search-hospital/search-hospital.component';
import { SlotBookingComponent } from './slot-booking/slot-booking.component';

@NgModule({
  declarations: [
    AppComponent,
    OtpGeneratorComponent,
    RegisterComponent,
    PageNotFoundComponent,
    LoginComponent,
    SearchHospitalComponent,
    SlotBookingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
