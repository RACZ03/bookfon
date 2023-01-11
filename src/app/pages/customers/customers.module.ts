import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers.component';
import { CustomerRoutingModule } from './customers-routing.module';
import { CustomersListComponent } from './customers/customers.component';
import { TeamsComponent } from './customers/teams/teams.component';
import { TopCustomersComponent } from './customers/top-customers/top-customers.component';
import { RepeatCustomersComponent } from './customers/repeat-customers/repeat-customers.component';
import { FirstTimeCustomersComponent } from './customers/first-time-customers/first-time-customers.component';
import { RecentCustomersComponent } from './customers/recent-customers/recent-customers.component';
import { HighRefundsComponent } from './customers/high-refunds/high-refunds.component';
import { HighDisputesComponent } from './customers/high-disputes/high-disputes.component';
import { AllComponent } from './customers/all/all.component';
import { AccountsComponent } from './customers/accounts/accounts.component';
import { ReactiveFormsModule } from '@angular/forms';


import { NgxMaskModule, IConfig } from 'ngx-mask';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditCustomerComponent } from './customers/all/edit-customer/edit-customer.component';
import { WalletComponent } from './customers/all/wallet/wallet.component';
import { ScheduleComponent } from './customers/all/schedule/schedule.component';
import { SubCustomerComponent } from './customers/all/sub-customer/sub-customer.component';
import { BootFonFullCalendarModule } from 'src/app/shared/components/full-calendar/full-calendar.module';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { NgSelectModule } from '@ng-select/ng-select';

export const options: Partial<null|IConfig> | (() => Partial<IConfig>) = null;


@NgModule({
  imports: [
    CommonModule,
    CustomerRoutingModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    SharedModule,
    FormsModule,
    DataTablesModule,
    BootFonFullCalendarModule,
    ThemeModule,
    NgSelectModule
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
    HighDisputesComponent,
    EditCustomerComponent,
    WalletComponent,
    ScheduleComponent,
    SubCustomerComponent
  ]
})
export class CustomersModule { }
