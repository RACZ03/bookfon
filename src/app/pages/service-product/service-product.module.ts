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
  ],
  imports: [
    CommonModule,
    ServiceProductRoutingModule,
  
  ]
})
export class ServiceProductModule { }
