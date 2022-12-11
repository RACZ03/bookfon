import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceProductRoutingModule } from './service-product-routing.module';
import { ServicesComponent } from './services/services.component';
import { RetailProducComponent } from './retail-produc/retail-produc.component';
import { RoomsEquipmentComponent } from './rooms-equipment/rooms-equipment.component';
import { EventWorkshopComponent } from './event-workshop/event-workshop.component';
import { WaltListComponent } from './walt-list/walt-list.component';
import { BookingServiceComponent } from './booking-service/booking-service.component';
import { PickSpotComponent } from './pick-spot/pick-spot.component';
import { AllServiceComponent } from './services/all-service/all-service.component';
import { CategoriesComponent } from './services/categories/categories.component';
import { SubCategoriesComponent } from './services/sub-categories/sub-categories.component';
import { ClasificationsComponent } from './services/clasifications/clasifications.component';
import { TaxRatesComponent } from './services/tax-rates/tax-rates.component';
import { CouponsComponent } from './services/coupons/coupons.component';
import { SubcriptionsComponent } from './services/subcriptions/subcriptions.component';
import { ServiceProductComponent } from './service-product.component';
import { ServiceAddComponent } from './services/service-add/service-add.component';
import { ServiceinitComponent } from './services/serviceinit/serviceinit.component';
import { ListTaxrateComponent } from './services/tax-rates/list-taxrate/list-taxrate.component';
import { AddCategoriesComponent } from './services/categories/add-categories/add-categories.component';
import { AddSubcategoriesComponent } from './services/sub-categories/add-subcategories/add-subcategories.component';
import { AddClasificationsComponent } from './services/clasifications/add-clasifications/add-clasifications.component';
import { AddTaxratesComponent } from './services/tax-rates/add-taxrates/add-taxrates.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PromotionsComponent } from './services/promotions/promotions.component';
import { AddPromotionComponent } from './services/promotions/add-promotion/add-promotion.component';


@NgModule({
  declarations: [
    ServicesComponent,
    RetailProducComponent,
    RoomsEquipmentComponent,
    EventWorkshopComponent,
    WaltListComponent,
    BookingServiceComponent,
    PickSpotComponent,
    AllServiceComponent,
    CategoriesComponent,
    SubCategoriesComponent,
    ClasificationsComponent,
    TaxRatesComponent,
    CouponsComponent,
    SubcriptionsComponent,
    ServiceProductComponent,
    ServiceAddComponent,
    ServiceinitComponent,
    ListTaxrateComponent,
    AddCategoriesComponent,
    AddSubcategoriesComponent,
    AddClasificationsComponent,
    AddTaxratesComponent,
    PromotionsComponent,
    AddPromotionComponent,
  ],
  imports: [
    CommonModule,
    ServiceProductRoutingModule,
    ReactiveFormsModule,
    FormsModule, 
    DataTablesModule, 
    NgSelectModule,
    ThemeModule,
    SharedModule
  ]
})
export class ServiceProductModule { }
