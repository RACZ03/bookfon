import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffComponent } from './staff.component';
import { AllComponent } from './all/all.component';
import { ProfileComponent } from './profile/profile.component';
import { ScheduleComponent } from './profile/schedule/schedule.component';
import { AvailavilityComponent } from './profile/availavility/availavility.component';
import { ServicesComponent } from './profile/services/services.component';
import { BranchesComponent } from './profile/branches/branches.component';
import { StaffRoutingModule } from './staff-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { ProfileEditComponent } from './profile/profile/profile.component';
import {BootFonFullCalendarModule} from '../../shared/components/full-calendar/full-calendar.module';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddAvailabilityComponent } from './profile/availavility/add-availability/add-availability.component';
@NgModule({
    declarations: [
        StaffComponent,
        AllComponent,
        ProfileComponent,
        ScheduleComponent,
        AvailavilityComponent,
        ServicesComponent,
        BranchesComponent,
        SettingsComponent,
        ProfileEditComponent,
        AddStaffComponent,
        AddAvailabilityComponent
    ],
    imports: [
        CommonModule,
        StaffRoutingModule,
        NgxMaskModule.forRoot(),
        BootFonFullCalendarModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(
          {
            timeOut: 2500,
            positionClass: 'toast-bottom-right',
            preventDuplicates: true,
          }
        ),
        SharedModule,
  
    ],
    exports: [
      ScheduleComponent
    ],
})
export class StaffModule { }
