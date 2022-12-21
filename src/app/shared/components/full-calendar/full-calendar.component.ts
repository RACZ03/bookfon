import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';


declare var window: any;

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
  
  @Input() previewCoach: boolean = false;
  @Input() previewCustomer: boolean = false;
  public currentDate = moment().format('YYYY-MM-DD');

  public item: any = {};
  public modalPopUp: any = {};

  constructor() {}

  ngOnInit(): void {
    this.loadCalendar();
    this.modalPopUp = new window.bootstrap.Modal(
      document.getElementById('modalPopUp')
    );

  }

  handleDateClick(selectInfo: any) {
    // console.log(selectInfo);
    this.dateClickEventEmitter.emit(selectInfo);
  }

  handleEventClick(clickInfo: any) {
    // console.log('Log')
    // this.clickEventEmitter.emit(clickInfo);
    this.popup(clickInfo);
  }

  handleEventDrop(eventDropInfo: any) {
    // console.log(eventDropInfo);
    this.dropEventEmitter.emit(eventDropInfo);
  }

  handleEventResize(eventResizeInfo: any) {
    // console.log(eventResizeInfo);
    this.resizeEventEmitter.emit(eventResizeInfo);
  }

  loadCalendar() {
    // console.log('events1:::', this.events);
    let ct = this;
    this.calendarOptions = {
      schedulerLicenseKey: environment.FullCalendarKey,
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
      slotMinWidth: 125,
      weekends: true,
      displayEventEnd: true,
      editable: false,
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
        let { time, service_name, service_description, ubication, customer } =
          extendedProps;
          // console.log(customer);
        // convert time to 12 hours format
        let startTime = moment(time.startTime, 'HH:mm:ss').format('hh:mm A');
        let endTime = moment(time.endTime, 'HH:mm:ss').format('hh:mm A');
        return {
          html: `<div class="fc-event-content"
          style="height:auto;display:flex;position:relative; min-height: 40px;
           background-color: ${ct.hexToRgba((ui.backgroundColor!=''? ui.backgroundColor: '#fff'), 0.26)};
           min-width: 100%;
           border-top-right-radius: 10px !important;
           border-bottom-right-radius: 10px !important;
           border-left: 5px solid ${ui.borderColor};
           padding: 5px;"
           pointer-events: none;  cursor: default;>
         <div class="fc-event-title" style="text-align: center;">
         <label style="font-size: 12px; font-weight: 700; color: black;">${arg.event.title}</label>
           <br>
           <label style="font-size: 9px;font-weight:700;text-alight:center;color:black">${ startTime } - ${ endTime }</label>
           <br>
           <label style="font-size: 9px;color:black;text-alight:center">${service_name} ${service_description}</label><br>
           <label style="font-size: 9px;color:black;text-alight:center">Customer: ${ customer?.firstName } ${ customer?.lastName }</label>
         </div>
       </div>`,
      // html:
      // `<div class="fc-event-content" title=""
      //     style="height:auto;display:flex;position:relative;
      //     background-color: ${ct.hexToRgba((ui.backgroundColor!=''? ui.backgroundColor: '#fff'), 0.26)};
      //     min-width: 100%;
      //     border-top-right-radius: 3px !important;
      //     border-bottom-right-radius: 3px !important;
      //     border-left: 4px solid ${ui.borderColor};
      //     padding: 3px;"
      //     cursor: pointer !important">
      //   <div class="fc-event-title" style="font-weight: bold;text-align: center;color:${ '#000' }">
      //   <label class="d-block" style="font-size: 12px; font-weight: bold;display:block;white-space: nowrap;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">${ arg.event.title }</label>
      //   </div>
      // </div>`
        };
      },
    };
  }

  popup(e: any) {
    let found = this.events.find( item => item.id == e.event.id );
    // console.log(found);
    if ( found ) {
      let date = e.event.start,
        dateFormated = moment(date).format('YYYY-MM-DD');

      this.item = {...found, dateFormated };
      this.modalPopUp.show();
    }
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
