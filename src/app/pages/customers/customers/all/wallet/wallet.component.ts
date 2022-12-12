import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { CustomersService } from 'src/app/@core/services/customers.service';
import { TransactionsService } from 'src/app/@core/services/transactions.service';
import { AlertService } from 'src/app/@core/utils/alert.service';

declare var window: any;

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  public formModalRecharge: any;
  public data: any[] = [];
  public idSelected: number = 0;
  public balanceObj: any;

  constructor(
    private customerSvc: CustomersService,
    private alertSvc: AlertService,
    private route: ActivatedRoute,
    private TransactionSvc: TransactionsService
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
    this.formModalRecharge = new window.bootstrap.Modal(
      document.getElementById('modalRecharge')
    );
    // get id from url
    this.route.params.subscribe(params => {
      this.idSelected = params['id'];
      this.verifyWallet();
    });

  }

  async verifyWallet() {
    let resp = await this.customerSvc.verifyWallet(this.idSelected);
    if ( resp?.status == 200 ) {
      let { data } = resp;
      if ( data !== undefined ) {
        this.balanceObj = { idWallet: data.id };
        this.loadDataBalance();
        this.loadDataTransactions();
      } 
    } else {
      // create wallet
      let resp2 = await this.customerSvc.createWallet(this.idSelected);
      if ( resp2?.status == 200 ) {
        let { data } = resp2;
        if ( data !== undefined ) {
          this.loadDataBalance();
          this.loadDataTransactions();
        }
      } else {
        this.alertSvc.showAlert(3,'', 'Error');
      }
    }
  }

  searchData(e: any) {
    let value = e.target.value;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.search(value).draw();
    });
  }


  async loadDataBalance() {
    let resp = await this.TransactionSvc.getBalance(this.idSelected);
    // console.log(resp)
    if ( resp?. status == 200 ) {
      let { data } = resp;
      if ( data !== undefined ) {
        this.balanceObj = {...data};
      }
    } else {
      this.alertSvc.showAlert(3,'', 'No data found');
    }

    // this.dtTrigger.next(this.dtOptions);
  }

  async loadDataTransactions() {
    let resp = await this.TransactionSvc.getTransacciones(this.idSelected);
    // console.log(resp);
    if ( resp?. status == 200 ) {
      let { data } = resp;
      if ( data !== undefined ) {
        this.data = data;

        // if ( this.data.length > 0 ) {
        //   this.balanceObj = { idWallet: this.data[0]?.wallet?.id };
        //   // console.log(this.balanceObj)
        // }
      }
    } else {
      this.alertSvc.showAlert(3,'', 'No data found');
    }

    this.dtTrigger.next(this.dtOptions);
  }

  /*  OPEN MODAL RECHARGE  */
  openModalRecharge() {
    this.formModalRecharge.show();
  }

  closeModalRecharge() {
    this.formModalRecharge.hide();
    this.renderer();
    this.loadDataTransactions();
    this.loadDataBalance();
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
