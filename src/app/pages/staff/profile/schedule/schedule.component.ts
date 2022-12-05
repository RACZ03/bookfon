import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  events = [
    {
      title: 'Custom Event',
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
        description: 'Corte de cabello para hombre personalizado',
      },
      ubication: 1,
    },
    {
      imageurl: '',
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }

  refreshEventEmitter(event: any) {
    console.log('refreshEventEmitter', event);
  }

  dateClickEventEmitter(event: any) {
    console.log('dateClickEventEmitter', event);
  }

  dropEventEmitter(event: any) {
    console.log('dropEventEmitter', event);
  }

  resizeEventEmitter(event: any) {
    console.log('resizeEventEmitter', event);
  }

  clickEventEmitter(event: any) {
    console.log('clickEventEmitter', event);
  }
}
