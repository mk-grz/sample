import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { OtpGeneratorComponent } from './otp-generator/otp-generator.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';
import { SearchHospitalComponent } from './search-hospital/search-hospital.component';
import { SlotBookingComponent } from './slot-booking/slot-booking.component';

const routes: Routes = [
  {
    path:'',
    component:OtpGeneratorComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'search',
    component:SearchHospitalComponent
  },
  {
    path:'slots',
    component:SlotBookingComponent
  },
  {
    path:'**',
    component:PageNotFoundComponent
  }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
