import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CustomersComponent } from './customers.component';
import { SubCustomerComponent } from './customers/all/sub-customer/sub-customer.component';
import { WalletComponent } from './customers/all/wallet/wallet.component';

// import { AdminGuard } from '../shared/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: CustomersComponent,
  },
  {
    path: 'sub-customers/:id',
    component: SubCustomerComponent,
  },
  {
    path: 'wallet/:id',
    component: WalletComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {
}
