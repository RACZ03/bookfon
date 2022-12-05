import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookfonServicesComponent } from './bookfon-services.component';
import { BookfonServiceRoutingModule } from './bookfon-service-routing.module';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';

@NgModule({
  declarations: [
    BookfonServicesComponent
  ],
  imports: [
    CommonModule,
    BookfonServiceRoutingModule,
    MdbCarouselModule
    // HomeRoutingModule
  ]
})
export class BookFonServiceModule { }
