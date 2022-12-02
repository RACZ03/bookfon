import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { ServiceProductComponent } from './service-product/service-product.component';
import { ServiceProductModule } from './service-product/service-product.module';




@NgModule({
  declarations: [
    PagesComponent,

  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ThemeModule,
    ServiceProductModule
  ]
})
export class PagesModule { }
