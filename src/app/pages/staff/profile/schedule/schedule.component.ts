import { Component, OnInit } from '@angular/core';
import { StaffService } from 'src/app/@core/services/staff.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
declare var window: any;
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {
  events: any = [];
  public modalPopUp: any;
  public itemSelected: any = {};
  loadingEvents: boolean = false;
  constructor(private service: StaffService, private toast: ToastrService) {}

  async ngOnInit(): Promise<void> {
    await this.loadEvents();
    this.modalPopUp = new window.bootstrap.Modal(
      document.getElementById('modalPopUp')
    );
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

  clickEventEmitter(e: any) {
    let found = this.events.find((item: any) => item.id == e.event.id);

    if (found) {
      let date = e.event.start,
        dateFormated = moment(date).format('YYYY-MM-DD');
      this.itemSelected = { ...found, dateFormated };
      console.log("item event", this.itemSelected);
      this.modalPopUp.show();
    }
  }

  async loadEvents() {
    await this.service
      .getScheduleStaff()
      .then((res) => {
        this.events = res;
        this.loadingEvents = true;
      })
      .catch((err) => {
        this.loadingEvents = true;
        console.log(err);
        this.toast.error('Error while loading events', 'Error');
      });
  }
}
