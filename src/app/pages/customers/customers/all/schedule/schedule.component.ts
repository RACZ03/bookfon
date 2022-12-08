import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomersService } from 'src/app/@core/services/customers.service';
import { AlertService } from 'src/app/@core/utils/alert.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  loadingEvents: boolean = false;
  public idSelected: number = 0;
  public events: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private customerSvc: CustomersService,
    private alertSvc: AlertService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idSelected = params['id'];
      console.log(this.idSelected)
      this.loadData();
      // this.loadDataBalance();
    });
  }

  async loadData() {
    await this.customerSvc
    .getSchedule(this.idSelected)
    .then((res: any) => {
      if ( res == null || res?.data == null ) {
        this.alertSvc.showAlert(3, 'Info', 'No data found');
      }
      this.events = res;
      this.loadingEvents = true;
    })
    .catch((err) => {
      this.loadingEvents = true;
      // console.log(err);
      this.alertSvc.showAlert(4, 'Error', 'Error loading data');
    });
  }

}
