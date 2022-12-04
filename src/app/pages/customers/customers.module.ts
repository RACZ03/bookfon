import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers.component';
import { CustomerRoutingModule } from './customers-routing.module';
import { CustomersListComponent } from './customers/customers.component';
import { AccountsComponent } from './accounts/accounts.component';
import { TeamsComponent } from './customers/teams/teams.component';
import { TopCustomersComponent } from './customers/top-customers/top-customers.component';
import { RepeatCustomersComponent } from './customers/repeat-customers/repeat-customers.component';
import { FirstTimeCustomersComponent } from './customers/first-time-customers/first-time-customers.component';
import { RecentCustomersComponent } from './customers/recent-customers/recent-customers.component';
import { HighRefundsComponent } from './customers/high-refunds/high-refunds.component';
import { HighDisputesComponent } from './customers/high-disputes/high-disputes.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AllComponent } from './customers/all/all.component';
@NgModule({
  imports: [
    CommonModule,
    CustomerRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    CustomersComponent,
    CustomersListComponent,
    AllComponent,
    AccountsComponent,
    TeamsComponent,
    TopCustomersComponent,
    RepeatCustomersComponent,
    FirstTimeCustomersComponent,
    RecentCustomersComponent,
    HighRefundsComponent,
    HighDisputesComponent
  ]
})
export class CustomersModule { }
