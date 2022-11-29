import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffComponent } from './staff.component';
import { AllComponent } from './all/all.component';
import { ProfileComponent } from './profile/profile.component';
import { ScheduleComponent } from './profile/schedule/schedule.component';
import { AvailavilityComponent } from './profile/availavility/availavility.component';
import { ServicesComponent } from './profile/services/services.component';
import { BranchesComponent } from './profile/branches/branches.component';



@NgModule({
  declarations: [
    StaffComponent,
    AllComponent,
    ProfileComponent,
    ScheduleComponent,
    AvailavilityComponent,
    ServicesComponent,
    BranchesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class StaffModule { }
