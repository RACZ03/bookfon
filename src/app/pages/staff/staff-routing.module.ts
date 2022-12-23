import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { StaffComponent } from './staff.component';
import { LockTemporayAvailabilityComponent } from './lock-temporay-availability/lock-temporay-availability.component';
// import { AdminGuard } from '../shared/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: StaffComponent,
  },
  {
    path: 'lock-temporary-availability/:id',
    component: LockTemporayAvailabilityComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffRoutingModule {
}
