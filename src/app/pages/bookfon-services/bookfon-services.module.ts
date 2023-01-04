import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookfonServicesComponent } from './bookfon-services.component';
import { BookfonServiceRoutingModule } from './bookfon-service-routing.module';
// import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { BootFonFullCalendarModule } from 'src/app/shared/components/full-calendar/full-calendar.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from 'src/app/@theme/theme.module';
@NgModule({
  declarations: [
    BookfonServicesComponent
  ],
  imports: [
    CommonModule,
    BookfonServiceRoutingModule,
    // MdbCarouselModule,
    BootFonFullCalendarModule,
    NgSelectModule,
    ReactiveFormsModule,
    FormsModule,
    ThemeModule
    // HomeRoutingModule
  ]
})
export class BookFonServiceModule { }
