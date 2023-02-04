import { Component, OnInit, EventEmitter, Output, ViewChild, OnDestroy, Input, HostListener } from '@angular/core';
import { StaffService } from '../../../@core/services/staff.service';
import { staffItem } from 'src/app/@core/Interfaces/Staff';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/@core/utils/alert.service';
import { UsersService } from 'src/app/@core/services/users.service';
declare var window: any;
@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss'],
})
export class AllComponent implements OnInit, OnDestroy {

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  @Output() selectedStaff = new EventEmitter();

  public formModalChangePass: any;
  public confirmChangeStatusModal: any;
  public deleteRecordConfirmModal: any;
  public idSelected: number = 0;
  public formModalPositionCoach: any;
  public lockTemporaryAvailability: boolean = false;
  public itemDelete: any;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  staff: staffItem[] = [];
  id: number = 0;
  position: number = 0;
  status: number = 0;
  message: string = '';
  comment: string = '';
  data:any;

  constructor(
    private staffService: StaffService, 
    private userSvc: UsersService,
    private alertSvc: AlertService,
    private router: Router
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
      document.getElementById('modalChangePassCustomers')
    );
    this.confirmChangeStatusModal = new window.bootstrap.Modal(
      document.getElementById('confirmChangeStatusModal')
    );

    this.deleteRecordConfirmModal = new window.bootstrap.Modal(
      document.getElementById('deleteRecordConfirmModal')
    );

    this.formModalPositionCoach = new window.bootstrap.Modal(
      document.getElementById('modalPositionCoach')
    );

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

    this.loadData();
  }

  async loadData() {
    this.staffService.getStaffByBusiness().then((response: any) => {
      if ( response !== undefined) {
        let { data } = response;
        if ( data !== undefined ) {
          this.data = data;
        } else {
          this.data = [];
        }
        this.status = response?.status;
        this.message = response?.message;
        this.comment = response?.comment;
        this.dtTrigger.next(this.dtOptions);
      }
    });
  }



  editStaff(staff: object) {
    this.selectedStaff.emit(staff);
  }

  openModalChangePass(id: number): void {
    this.idSelected = id;
    this.formModalChangePass.show();
  }

  openModalDeleteRecord(item: any): void {
    this.itemDelete = item;
    this.deleteRecordConfirmModal.show();
  }

  async openModalChangeStatus(id: number, i: number) {
    this.idSelected = id;
    this.position = i;
    this.confirmChangeStatusModal.show();
  }

  openModalLockAvailavility(id: number) {
    this.router.navigate(['/pages/staff/lock-temporary-availability/', id]);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  closeModalChangePass(band: boolean) {
    if (band)
      this.formModalChangePass.hide();

    this.idSelected = 0;
    this.renderer();
    this.loadData();
  }
  confirmDeleteRecord(band: boolean) {

    if (band == true && this.itemDelete != undefined) {
      this.deleteRecordStaff();
      this.deleteRecordConfirmModal.hide();
    } else {
      this.deleteRecordConfirmModal.hide();
    }
  }

  async deleteRecordStaff() {
    let resp = await this.userSvc.removeRole(this.itemDelete?.email, 'ROLE_ADMIN');
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

  //  change status

  confirmChangeStatusOnDelete(data: boolean) {
    if (data == true && this.idSelected != 0) {
      this.changeStatusStaff(this.idSelected);
    } else {
      this.closeModalChangStatus();
      if ( this.position != 0 ) {
        // cheched input
        let input = document.getElementById('chechedStatus-'+this.position) as HTMLInputElement;  
        input.checked = true;
      }
    }

  }

  closeModalChangStatus() {
    this.confirmChangeStatusModal.hide();
  }

  changeStatusStaff(id: number) {
    this.staffService.enableDisableStaff(id).then(response => {
      this.alertSvc.showAlert(1, '', 'Status has been changed');
      this.renderer();
      this.loadData();
      this.closeModalChangStatus();
    }).catch(error => {
      this.renderer();
      this.alertSvc.showAlert(4, '', 'It is not possible to change the status at this time');
    });
  }

  closeModalpositions(band: boolean) {
    if ( band )
      this.formModalPositionCoach.hide();

   this.renderer();
   this.loadData();
  }  

  renderer() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
    });
  }

  // listen to event click in button by id
  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (event.target.id == "showModalOrderStaff") {
      this.formModalPositionCoach.show();
    }
  }
  
}
