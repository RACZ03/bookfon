import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  Output,
  EventEmitter,
} from '@angular/core';

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

  @Input() events: any = [];

  constructor() { }

  ngOnInit(): void {
    if (this.events.length < 0) {
      this.events = [
        {
          title: 'All Day Event',
          start: '2022-12-04',
          end: '2022-12-04',
          color: '#f44336',
          borderColor: '#f44336',
          textColor: '#fff',
          url: '',
          time: {
            startTime: '08:00',
            endTime: '09:00',
          },
          service: {
            name: 'Corte de cabello',
            description: 'Corte de cabello para hombre',
          },
          ubication: 1,
        },
        {
          imageurl: '',
        },
      ];
    }
    this.loadCalendar();
  }

  handleDateClick(selectInfo: any) {
    console.log(selectInfo);
    this.dateClickEventEmitter.emit(selectInfo);
  }

  handleEventClick(clickInfo: any) {
    console.log(clickInfo);
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
        right: 'newEvent,dayGridMonth,timeGridWeek,timeGridDay,listWeek',
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
        console.log('data', arg);
        let { ui } = arg.event._def;
        let { extendedProps } = arg.event._def;
        let { time, service, ubication } = extendedProps;
        return {
          html: `<div class="fc-event-content"
              style="min-height: 40px;
              background-color: ${ct.hexToRgba(ui?.backgroundColor, 0.26)};
              min-width: 100%;
              border-top-right-radius: 10px !important;
              border-bottom-right-radius: 10px !important;
              border-left: 5px solid ${ui?.borderColor};
              padding: 5px;"
              pointer-events: none;  cursor: default;>
            <img src="https://api-rest-btc.herokuapp.com/${arg?.event?._def?.url
            }" appBrokenImagen
                class="rounded-circle" width="35" height="35" style="position: absolute; top: 10px; border: 3px solid ${ui?.borderColor
            }">
            <br>
            <div class="fc-event-title" style="text-align: left;">
            <label style="float: right; font-size: 10px; margin-right: 20px;">${ubication === 1 ? 'Clinica' : 'zoom'
            }</label><br>
              <label style="font-size: 11px; font-weight: 700; color: ${ui?.backgroundColor
            };">${arg?.event?.title}</label><br>
              <label style="font-size: 9px;">${time?.startTime.slice(
              0,
              5
            )} - ${time?.endTime.slice(0, 5)}</label><br>
              <label style="font-size: 9px;">${service?.name} ${service?.description
            }</label>
            </div>
          </div>`,
        };
      },
    };
  }

  // converts hex to rgba for opacity
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
