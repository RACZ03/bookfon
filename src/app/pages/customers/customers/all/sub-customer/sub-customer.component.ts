import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { CustomersService } from 'src/app/@core/services/customers.service';
import { AlertService } from 'src/app/@core/utils/alert.service';
import { ToastrService } from 'ngx-toastr';

declare var window: any;

@Component({
  selector: 'app-sub-customer',
  templateUrl: './sub-customer.component.html',
  styleUrls: ['./sub-customer.component.scss']
})
export class SubCustomerComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  itemSubCustomer = {
    birthday: null,
    emergencyPhone: null,
    firstName: null,
    id: null,
    idCustomer: null,
    lastName: null,
    parentFirstName: null,
    parentLastName: null,
    parentPhone: null
  };

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  public formModalChangePass: any;
  public formModalSendMessage: any;
  public idSelected: number = 0;

  public data: any[] = [];
  constructor(
    private customerSvc: CustomersService,
    private alertSvc: AlertService,
    private route: ActivatedRoute,
    private toast: ToastrService
  ) {
    this.dtOptions = {
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
    // console.log(resp);
    if (resp?.status == 200) {
      let { data } = resp;
      if (data !== undefined) {
        this.data = data;
      }
    } else {
      this.alertSvc.showAlert(3, '', 'No data found');
    }

    this.dtTrigger.next(this.dtOptions);
  }

  /* Section: Modal Change Password */
  openModalChangePass(id: number): void {
    this.idSelected = id;
    this.formModalChangePass.show();
  }

  closeModalChangePass(band: boolean) {
    if (band)
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

  editSubCustomer(item: any) {
    this.itemSubCustomer.birthday = item.birthday;
    this.itemSubCustomer.emergencyPhone = item.emergencyPhone;
    this.itemSubCustomer.firstName = item.firstName;
    this.itemSubCustomer.id = item.id;
    this.itemSubCustomer.idCustomer = item.idCustomer;
    this.itemSubCustomer.lastName = item.lastName;
    this.itemSubCustomer.parentFirstName = item.parentFirstName;
    this.itemSubCustomer.parentLastName = item.parentLastName;
    this.itemSubCustomer.parentPhone = item.parentPhone;
  }

  saveSubCustomer() {
    if (!this.itemSubCustomer.firstName) {
      this.toast.error('First name is required', 'Error');
      return;
    }

    if (!this.itemSubCustomer.lastName) {
      this.toast.error('Last name is required', 'Error');
      return;
    }

    if (!this.itemSubCustomer.emergencyPhone) {
      this.toast.error('Emergency phone is required', 'Error');
      return;
    }

    if (!this.itemSubCustomer.parentFirstName) {
      this.toast.error('Parent first name is required', 'Error');
      return;
    }

    if (!this.itemSubCustomer.parentLastName) {
      this.toast.error('Parent last name is required', 'Error');
      return;
    }

    if (!this.itemSubCustomer.parentPhone) {
      this.toast.error('Parent phone is required', 'Error');
      return;
    }

    this.customerSvc.updateSubCustomer(this.itemSubCustomer).then(() => {
      this.toast.success('Successfully', 'Success');
      this.loadData();
    }).catch((error) => {
      console.log(error);
      this.toast.error('Error unexpected, update sub customer', 'Error');
    });
  }

  ngOnDestroy(): void {
    // this.renderer
    this.dtTrigger.unsubscribe();
  }

}
