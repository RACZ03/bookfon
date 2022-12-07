import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';

import { Subject } from 'rxjs';
import { AvailavilityService } from 'src/app/@core/services/avaivility.service';
declare var window: any;

@Component({
  selector: 'app-availavility',
  templateUrl: './availavility.component.html',
  styleUrls: ['./availavility.component.scss']
})
export class AvailavilityComponent implements OnInit {
  public idStaff: number = 0;
  public buttonAdd: boolean = false;

  @Input() set setIdProfile(id: number){
    this.idStaff = id;
  }; 

  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
   
  public data: any[] = [];

  public idProfile: number = 0;
  notifySvc: any;

  public formModal: any;
  public formModalDelete: any;

  public coachSchedule: any = false;
  public id: number = 0;
  public idSettings: number = 0;
  //spublic currentDate = moment().format('YYYY-MM-DD');

  constructor(
    private avaivilitySvr: AvailavilityService,
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

    this.formModal = new window.bootstrap.Modal(
      document.getElementById('formNewSchedule')
    );

    this.formModalDelete = new window.bootstrap.Modal(
      document.getElementById('modalDeleteSlotConfiguration')
    );
  }

  /* Load Data */
  async loadData() {
    // this.spinnerSvc.show();
    //console.log(this.idStaff);
  let resp = await this.avaivilitySvr.getListByIdStaff(this.idStaff);
     console.log(resp);
     if(resp.status == 404)
     this.buttonAdd = true;

    if ( resp != null || resp != undefined ) {
      let { data } = resp;
      this.data = data || [];
    } else {
      this.data = [];
      this.notifySvc.showAlert(3, 'No results found', '');
    }
     this.dtTrigger.next(this.dtOptions);
  }

  /* Section New */
  showModal(e: boolean) {
    if ( !e ) {
      return
    }
    this.formModal.show();
  }

  closeModal(band: boolean) {
    if ( band )
      this.formModal.hide();

    this.idSettings = 0;
    this.coachSchedule = false;
    this.renderer();
    this.loadData();
  }

  
  /* Section Update */
  onEdit() {
  
    this.coachSchedule = this.data;
      
    this.formModal.show();
  }


  /* Section Delete */
  openModalDelete(id: number) {
    this.id = id;
    this.formModalDelete.show();
  }

  async onDelete(band: boolean) {
    if ( !band ) {
      this.formModalDelete.hide();
      return
    }
    let resp = await this.avaivilitySvr.getListByIdStaff(this.id);
    if ( resp != null || resp != undefined ) {
      let  { status } = resp;

      if ( status !== undefined && status === 200 ) {
        this.id = 0
        this.formModalDelete.hide();
        this.notifySvc.showAlert(1, resp?.comment, 'Success')
        this.renderer();
        this.loadData();
      } else {
        this.notifySvc.showAlert(4, resp?.comment, 'Error');
      }   
    } else {
      this.notifySvc.showAlert(4, 'Error', 'Error');
    }
  }
  // End Section: Modal Delete

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
