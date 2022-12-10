import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/@core/services/services.service';
import { ToastrService } from 'ngx-toastr';
import { StaffService } from 'src/app/@core/services/staff.service';
var _ = require('lodash');
@Component({
  selector: 'app-bookfon-services',
  templateUrl: './bookfon-services.component.html',
  styleUrls: ['./bookfon-services.component.scss']
})
export class BookfonServicesComponent implements OnInit {

  loadingEvents: boolean = true;
  oldEvents: any = [];
  events: any = [];
  selectedService = [];
  services: any = [];
  staff: any = [];

  constructor(private service: ServicesService, private toast: ToastrService, private staffService: StaffService) {
  }

  async ngOnInit(): Promise<any> {
    await this.loadServices();
    await this.loadScheduleBissnes();
    await this.loadStaff();
  }

  async selectedStaff(staff: any) {
    this.events = [...this.oldEvents];
    await this.filterEventsByStaff(staff.id);
  }

  async filterEventsByStaff(id: number) {
    this.loadingEvents = true;
    this.events = this.events.filter((item: any) => item.idStaff == id);
    setTimeout(() => {
      this.loadingEvents = false;
    }, 2000);
  }

  async loadStaff() {
    this.staffService.getAllStaff().then(response => {
      // console.log(response.data)
      this.staff = response.data;
    }).catch(error => {
      // console.log(error);
      this.toast.error('Error while loading staff', 'Error');
    })
  }

  refreshEvent() {
    this.loadingEvents = true;
    setTimeout(() => {
      this.loadingEvents = false;
    }, 1000);
  }

  async loadScheduleBissnes() {
    await this.service
      .getScheduleBussines()
      .then((res) => {
        this.events = res;
        this.oldEvents = [...this.events];
        this.loadingEvents = false;
      })
      .catch((err) => {
        this.loadingEvents = false;
        // console.log(err);
        this.toast.error('Error while loading events', 'Error');
      });
  }

  async loadServices() {
    this.service.getServicesByBusinesset().then(response => {
      this.services = response.data;
    }).catch(() => {
      this.toast.error('Error while loading service', 'Error');
    });
  }

  ServiceSelected() {
    this.events = [...this.oldEvents];

    if (this.selectedService.length <= 0) {
      this.loadingEvents = true;
      setTimeout(() => {
        this.loadingEvents = false;
      }, 1000);
      return;
    };
    this.filterEventsByService();
  }

  filterEventsByService() {
    let ct = this;
    this.loadingEvents = true;
    var result: any = [];

    _.forEach(this.events, function (n: any, key: any) {
      _.forEach(ct.selectedService, function (n2: any, key2: any) {
        if (n.service.id === n2) {
          result.push(n);
        }
      });
    });
    setTimeout(() => {
      this.events = result;
      this.loadingEvents = false;
    }, 2000);
  }

}
