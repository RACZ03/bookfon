import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomersService } from 'src/app/@core/services/customers.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  public idSelected: number = 0;
  constructor(
    private route: ActivatedRoute,
    private customerSvc: CustomersService,
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
    let resp = await this.customerSvc.getSchedule(this.idSelected);
    console.log(resp)
  }

}
