import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { ListComponent } from './team-users/list/list.component';
import { YouBussinesComponent } from './you-bussines/you-bussines.component';
import { AccountComponent } from './you-bussines/account/account.component';
import { PublicDetailsComponent } from './you-bussines/public-details/public-details.component';
import { BusinessDetailsComponent } from './you-bussines/business-details/business-details.component';
import { LinkedExternalComponent } from './you-bussines/linked-external/linked-external.component';
import { BankAccountComponent } from './you-bussines/bank-account/bank-account.component';
import { TaxDetailsComponent } from './you-bussines/tax-details/tax-details.component';
import { BrandingComponent } from './you-bussines/branding/branding.component';
import { CustomersSettingsComponent } from './you-bussines/customers-settings/customers-settings.component';
import { StaffSettingsComponent } from './you-bussines/staff-settings/staff-settings.component';
import { AmindSettingsComponent } from './you-bussines/amind-settings/amind-settings.component';
import { BranchesComponent } from './you-bussines/branches/branches.component';
import { AppMarketplaceComponent } from './app-marketplace/app-marketplace.component';
import { CustomerComponent } from './you-bussines/branding/customer/customer.component';
import { InvoicepaymentComponent } from './you-bussines/branding/invoicepayment/invoicepayment.component';
import { InvoicePdfComponent } from './you-bussines/branding/invoice-pdf/invoice-pdf.component';
import { IdentityComponent } from './you-bussines/branding/identity/identity.component';
import { ChekoutComponent } from './you-bussines/branding/chekout/chekout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from 'src/app/shared/shared.module';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [
    SettingsComponent,
    ListComponent,
    YouBussinesComponent,
    AccountComponent,
    PublicDetailsComponent,
    BusinessDetailsComponent,
    LinkedExternalComponent,
    BankAccountComponent,
    TaxDetailsComponent,
    BrandingComponent,
    CustomersSettingsComponent,
    StaffSettingsComponent,
    AmindSettingsComponent,
    BranchesComponent,
    AppMarketplaceComponent,
    CustomerComponent,
    InvoicepaymentComponent,
    InvoicePdfComponent,
    IdentityComponent,
    ChekoutComponent,
    IdentityComponent,
    InvoicepaymentComponent,
    InvoicePdfComponent,
    CustomerComponent,
    AccountComponent
    ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule, 
    NgxMaskModule.forRoot(),
    SharedModule,
    ThemeModule,
    NgSelectModule
  ]
})
export class SettingsModule { }
