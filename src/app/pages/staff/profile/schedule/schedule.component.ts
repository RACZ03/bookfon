import { Component, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/angular';
import { INITIAL_EVENTS, createEventId } from '../../event-utils/event-utils';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  public events: any[] = [{
        title  : 'TESTING EVENT',
        start  : '2022-12-03',
        end  : '2022-12-03',
        imageurl:'./assets/images/users/1.jpg',
  }

  ];
  calendarVisible = true;
  public calendarOptions: any;
  public modalPopUp: any;
  public itemSelected: any = {};
  constructor() { }

  ngOnInit(): void {
    this.loadCalendar();
  }

  loadCalendar() {
    this.calendarOptions = {
        headerToolbar: {
          left: 'prev,next',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        },
        initialView: 'dayGridMonth',
        themeSystem: 'bootstrap5',
        events: this.events,
        weekends: true,
        editable: false,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        DragEvent: true,
        width: '100%',
        // select: this.handleDateSelect.bind(this),
        // selected day
        dateClick: this.handleDateClick.bind(this),
        // eventsSet: this.handleEvents.bind(this),
        eventContent: function(arg:any) {
          // console.log(arg.event._def);
          let { ui } = arg.event._def;
          let { extendedProps } = arg.event._def;
          let { time, service, ubication } = extendedProps;
          // console.log(ui)
          return {
            html:
            `<div class="fc-event-content"
                style="min-height: 40px;
                background-color: ${ '' };
                min-width: 100%;
                border-top-right-radius: 10px !important;
                border-bottom-right-radius: 10px !important;
                border-left: 5px solid ${ '' };
                padding: 5px;"
                pointer-events: none;  cursor: default;>
              <img src="https://api-rest-btc.herokuapp.com/${ '' }" appBrokenImagen
                  class="rounded-circle" width="35" height="35" style="position: absolute; top: -10px; border: 3px solid ${ '' }">
              <br>
              <div class="fc-event-title" style="text-align: left;">
              <label style="float: right; font-size: 10px; margin-right: 20px;">${ 'zoom' }</label><br>
                <label style="font-size: 11px; font-weight: 700; color: ${ '' };">${ ''}</label><br>
                <label style="font-size: 9px;">${ '' } - ${ '' }</label><br>
                <label style="font-size: 9px;">${ '' } ${ '' }</label>
              </div>
            </div>`
          }
        }
    }
  }

  handleDateClick(selectInfo:any) {
    console.log(selectInfo);
  }

}
