import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { CustomersService } from 'src/app/@core/services/customers.service';
import { UsersService } from 'src/app/@core/services/users.service';
import { AlertService } from 'src/app/@core/utils/alert.service';

declare var window: any;

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit, OnDestroy {

  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  
  public data: any[] = [];

  public idSelected: number = 0;
  public itemSelected: any = null;
  public itemDelete: any;
  public modalDelete: any;

  public formModalEdit: any;
  public formModalChangePass: any;
  public formModalSendMessage: any;

  public divPrincipal: boolean = true;
  public divWallet: boolean = false;
  public divSchedule: boolean = false;
  public divSubCustomers: boolean = false;

  public phoneNumberSelected: number = 0;
  public formModalValidate: any;

  constructor(
    private customerSvc: CustomersService,
    private alertSvc: AlertService,
    private router: Router,
    private usersService: UsersService
  ) { 
    this.loadData();
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
    this.formModalEdit = new window.bootstrap.Modal(
      document.getElementById('modalEditCustomer'), 
    );
    this.formModalChangePass = new window.bootstrap.Modal(
      document.getElementById('modalChangePassCustomers')
    );
    this.formModalSendMessage = new window.bootstrap.Modal(
      document.getElementById('modalSendMessage')
    );
    this.formModalValidate = new window.bootstrap.Modal(
      document.getElementById('modalValidateNewCustomerAll')
    );

    this.modalDelete = new window.bootstrap.Modal(
      document.getElementById('modalDeleteCustomer')
    );
  }

  searchData(e: any) {
    let value = e.target.value;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.search(value).draw();
    });
  }

  async loadData() {
    let resp = await this.customerSvc.getAllUsers();
    // console.log(resp);
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

  /* Section: Edit customers */
  openEdit(obj: any) {
    this.itemSelected = obj;
    this.formModalEdit.show();
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
  openSendSMS( item: any ): void {
    this.phoneNumberSelected = item.phone;
    this.formModalSendMessage.show();
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

  /* ACTIONS */
  openSubCustomers( id: number ) {
    this.router.navigateByUrl(`/pages/customers/sub-customers/${id}`);
  }

  openWallet( id: number ) {
    this.router.navigateByUrl(`/pages/customers/wallet/${id}`);
  }

  openSchedule( id: number ) {
    this.router.navigateByUrl(`/pages/customers/schedule/${id}`);
  }

  showScreenNewCustomer() {
    this.formModalValidate.show();
  }

  closeModalEdit(event: any) {
    this.formModalEdit.hide();
    this.renderer();
    this.loadData();
  }

  onCloseModalAndOpenOld(event: any) {
    // console.log('Hi')
    if ( !event ) {
      this.formModalValidate.hide();
      this.router.navigate(['/pages/customers']);
      return
    } else {
      // Execute endpoint add permisses
      this.formModalValidate.hide();
      setTimeout(() => {
        this.itemSelected = { isNew: true };
        this.formModalEdit.show();
      }, 200);
    }
  }

  // Delete
  showModalDelete(item: any) {
    this.itemDelete = item;
    // open modal
    this.modalDelete.show();
  }

  async onDelete(e: any) {
    this.modalDelete.hide();
    if ( !e ) {
      return;
    }
    // hide
    let resp = await this.usersService.removeRole(this.itemDelete.email, 'ROLE_ADMIN');
    if ( resp !== undefined ) {
      let { status, comment } = resp;
      if ( status == 200 ) {
        this.alertSvc.showAlert(1, '', comment);
        this.renderer();
      } else {
        this.alertSvc.showAlert(3, '', (comment !== undefined ? comment : 'Error unexpected, try again'));
      }
    } else {
      this.alertSvc.showAlert(3, '', 'Error unexpected, try again');
    }
  }

}
