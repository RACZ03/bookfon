import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-full-calendar',
  templateUrl: './full-calendar.component.html',
  styleUrls: ['./full-calendar.component.scss'],
})
export class BootFonFullCalendar implements OnInit {
  @Output() refreshEventEmitter = new EventEmitter();
  @Output() dateClickEventEmitter = new EventEmitter();
  @Output() dropEventEmitter = new EventEmitter();
  @Output() resizeEventEmitter = new EventEmitter();
  @Output() clickEventEmitter = new EventEmitter();

  public calendarOptions: any;
  @Input() showCustomButton:boolean=true; 
  @Input() events: Array<any> = [];

  constructor() {}

  ngOnInit(): void {
    this.loadCalendar();
  }

  handleDateClick(selectInfo: any) {
    console.log(selectInfo);
    this.dateClickEventEmitter.emit(selectInfo);
  }

  handleEventClick(clickInfo: any) {
    this.clickEventEmitter.emit(clickInfo);
  }

  handleEventDrop(eventDropInfo: any) {
    console.log(eventDropInfo);
    this.dropEventEmitter.emit(eventDropInfo);
  }

  handleEventResize(eventResizeInfo: any) {
    console.log(eventResizeInfo);
    this.resizeEventEmitter.emit(eventResizeInfo);
  }

  loadCalendar() {
    console.log('events1:::', this.events);
    let ct = this;
    this.calendarOptions = {
      customButtons: {
        newEvent: {
          text: 'Reload Calendar',
          title: '',
          icon: 'bi-arrow-repeat',
          click: function () {
            alert('Refresh Event !');
            ct.refreshEventEmitter.emit();
          },
        },
      },
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: ct.showCustomButton ? 'newEvent,dayGridMonth,timeGridWeek,timeGridDay,listWeek':'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
      },
      initialView: 'dayGridMonth',
      themeSystem: 'bootstrap5',
      events: this.events,
      weekends: true,
      editable: false,
      overlap: false,
      selectable: false,
      selectMirror: false,
      droppable: false,
      width: '100%',
      height: 'auto',

      dateClick: this.handleDateClick.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventDrop: this.handleEventDrop.bind(this),
      eventResize: this.handleEventResize.bind(this),
      eventContent: function (arg: any) {
        let { ui } = arg.event._def;
        let { extendedProps } = arg.event._def;
        let { time, service_name, service_description, ubication } =
          extendedProps;
        return {
          html: `<div class="fc-event-content"
           style="min-height: 40px;
           background-color: ${ct.hexToRgba((ui.backgroundColor!=''? ui.backgroundColor: '#fff'), 0.26)};
           min-width: 100%;
           border-top-right-radius: 10px !important;
           border-bottom-right-radius: 10px !important;
           border-left: 5px solid ${ui.borderColor};
           padding: 5px;"
           pointer-events: none;  cursor: default;>
         <img src="https://api-rest-btc.herokuapp.com/${
           arg.event._def.url
         }" appBrokenImagen
             class="rounded-circle" width="35" height="35" style="position: absolute; top: -10px; border: 3px solid ${
               ui.borderColor
             }">
         <br>
         <div class="fc-event-title" style="text-align: center;">
         <label style="font-size: 12px; font-weight: 700; color: black;">${arg.event.title}</label>
           <br>
           <label style="font-size: 9px;font-weight:700;text-alight:center;color:black">${time.startTime.slice(0,5)} - ${time.endTime.slice(0, 5)}</label>
           <br>
           <label style="font-size: 9px;color:black;text-alight:center">${service_name} ${service_description}</label>
         </div>
       </div>`,
        };
      },
    };
  }

  hexToRgba(hex: any, alpha: any) {
    let r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
    }
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }
}
