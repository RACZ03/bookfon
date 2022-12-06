import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { CustomersService } from 'src/app/@core/services/customers.service';
import { AlertService } from 'src/app/@core/utils/alert.service';

declare var window: any;

@Component({
  selector: 'app-sub-customer',
  templateUrl: './sub-customer.component.html',
  styleUrls: ['./sub-customer.component.scss']
})
export class SubCustomerComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  public formModalChangePass: any;
  public formModalSendMessage: any;
  public idSelected: number = 0;
  
  public data: any[] = [];
  constructor(
    private customerSvc: CustomersService,
    private alertSvc: AlertService,
    private route: ActivatedRoute
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
      search: false,
      info: false,
    }
  }

  ngOnInit(): void {
    this.formModalChangePass = new window.bootstrap.Modal(
      document.getElementById('modalChangePassSubCustomers')
    );
    this.formModalSendMessage = new window.bootstrap.Modal(
      document.getElementById('modalSendMessageSub')
    );
    // get id from url
    this.route.params.subscribe(params => {
      this.idSelected = params['id'];
      this.loadData();
    });
  }

  async loadData() {
    let resp = await this.customerSvc.getAllSubCustomers(this.idSelected);
    console.log(resp);
    if ( resp?. status == 200 ) {
      let { data } = resp;
      if ( data !== undefined ) {
        this.data = data;
      }
    } else {
      this.alertSvc.showAlert(3,'', 'No data found');
    }

    this.dtTrigger.next(this.dtOptions);
  }

  /* Section: Modal Change Password */
  openModalChangePass(id: number): void {
    this.idSelected = id;
    this.formModalChangePass.show();
  }

  closeModalChangePass(band: boolean) {
    if ( band )
      this.formModalChangePass.hide();

    this.idSelected = 0;
    this.renderer();
    this.loadData();
  }

  /* Section: Modal SEND SMS */
  openSendSMS(): void {
    this.formModalSendMessage.show();
  }

  searchData(e: any) {
    let value = e.target.value;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.search(value).draw();
    });
  }


  /* Section Render & Destoy */
  renderer() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
  });
  }

  ngOnDestroy(): void {
    // this.renderer
    this.dtTrigger.unsubscribe();
  }

}
