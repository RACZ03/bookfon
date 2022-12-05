import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CustomersComponent } from './customers.component';

// import { AdminGuard } from '../shared/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: CustomersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {
}
