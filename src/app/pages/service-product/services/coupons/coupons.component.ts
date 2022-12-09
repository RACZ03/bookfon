import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ServicesService } from 'src/app/@core/services/services.service';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.scss']
})
export class CouponsComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  public data: any[] = [];

  constructor(
    private serviceSvr : ServicesService,
  ) { 
    this.dtOptions = {
      // pagingType: 'full_numbers',
      pagingType: "simple_numbers",
      pageLength: 5,
      scrollX: true,
      autoWidth: false,
      destroy: true,
      responsive: true,
      dom: 'Bfrtip',
      searching: true,
      info: false,
  }
  }

  ngOnInit(): void {

  this.loadData();
  }

  async loadData() {
    this.data = [];
    let resp = await this.serviceSvr.getCuponsByBusiness();
      this.data = resp.data;
    // console.log(this.data);
      this.dtTrigger.next(this.dtOptions);

  }

}
