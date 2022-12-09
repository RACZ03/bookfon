import { Component, OnInit, EventEmitter, Output, ViewChild, OnDestroy, Input, HostListener } from '@angular/core';
import { StaffService } from '../../../@core/services/staff.service';
import { staffItem } from 'src/app/@core/Interfaces/Staff';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
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

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  staff: staffItem[] = [];
  id: number = 0;
  status: number = 0;
  message: string = '';
  comment: string = '';
  data:any;

  constructor(private staffService: StaffService, private toast: ToastrService) { }


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

  async deleteRecordStaff() {
    this.staffService.deleteStaff(this.idSelected).then(response => {
      this.renderer();
      this.loadData();
      this.toast.success("success delete record", "Success");
    }).catch(error => {
      this.toast.error("It is not possible to delete record", "Error");
    });
  }

  async loadData() {
    this.staffService.getStaffOrder().then((response) => {
      // console.log(response);
      this.data = response?.data;
      this.status = response?.status;
      this.message = response?.message;
      this.comment = response?.comment;
      this.dtTrigger.next(this.dtOptions);
    });
  }



  editStaff(staff: object) {
    this.selectedStaff.emit(staff);
  }

  openModalChangePass(id: number): void {
    this.idSelected = id;
    this.formModalChangePass.show();
  }

  openModalDeleteRecord(id: number): void {
    this.idSelected = id;
    this.deleteRecordConfirmModal.show();
  }

  async openModalChangeStatus(id: number) {
    this.idSelected = id;
    this.confirmChangeStatusModal.show();
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
    if (band == true && this.idSelected != 0) {
      this.deleteRecordStaff();
      this.deleteRecordConfirmModal.hide();
    } else {
      this.deleteRecordConfirmModal.hide();
    }
  }

  confirmChangeStatusOnDelete(data: boolean) {
    if (data == true && this.idSelected != 0) {
      this.changeStatusStaff(this.idSelected);
    } else {
      this.closeModalChangStatus();
    }

  }

  closeModalChangStatus() {
    this.confirmChangeStatusModal.hide();
  }

  changeStatusStaff(id: number) {
    this.staffService.enableDisableStaff(id).then(response => {
      this.toast.success("Status has been changed", "Success");
      this.renderer();
      this.loadData();
      this.closeModalChangStatus();
    }).catch(error => {
      this.renderer();
      this.toast.error("It is not possible to change the status at this time", "Error");
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
