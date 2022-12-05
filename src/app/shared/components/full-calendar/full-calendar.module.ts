import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BootFonFullCalendar } from './full-calendar.component';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import { FullCalendarModule } from '@fullcalendar/angular';

FullCalendarModule.registerPlugins([
  // register FullCalendar plugins
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin,
  bootstrap5Plugin,
]);

@NgModule({
  declarations: [BootFonFullCalendar],
  imports: [CommonModule, FullCalendarModule],
  exports: [BootFonFullCalendar],
})
export class BootFonFullCalendarModule {}
