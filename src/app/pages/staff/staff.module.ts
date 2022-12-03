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

import { FullCalendarModule, Theme } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
dayGridPlugin,
timeGridPlugin,
listPlugin,
interactionPlugin,
bootstrap5Plugin
]);

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
        ProfileEditComponent
    ],
    imports: [
        CommonModule,
        StaffRoutingModule,
        FullCalendarModule
    ],
    exports: [
      ScheduleComponent
    ],
})
export class StaffModule { }
