import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import * as moment from 'moment';

import { Subject } from 'rxjs';
import { AvailavilityService } from 'src/app/@core/services/avaivility.service';
import { AlertService } from 'src/app/@core/utils/alert.service';
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

  // public formModal: any;
  public activeAdd: boolean = false;
  public formModalDelete: any;

  public coachSchedule: any = false;
  public id: number = 0;
  public idSettings: number = 0;
  public currentDate = moment().format('YYYY-MM-DD');
  //spublic currentDate = moment().format('YYYY-MM-DD');

  constructor(
    private avaivilitySvr: AvailavilityService,
    private alertSvc: AlertService,
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

    // this.formModal = new window.bootstrap.Modal(
    //   document.getElementById('formNewSchedule')
    // );

    this.formModalDelete = new window.bootstrap.Modal(
      document.getElementById('modalDeleteSlotConfiguration')
    );
  }

  /* Load Data */
  async loadData() {
    // this.spinnerSvc.show();
    // console.log(this.idStaff);
    let resp = await this.avaivilitySvr.getListByIdStaff(this.idStaff);
    //  console.log(resp);
     if(resp?.status == 404)
     this.buttonAdd = true;

    if ( resp != null || resp != undefined ) {
      let { data } = resp;
      this.data = data || [];
    } else {
      this.data = [];
      this.alertSvc.showAlert(3, '', 'No results found');
    }
    // console.log(this.data);
     this.dtTrigger.next(this.dtOptions);
  }

  /* Section New */
  showModal(e: boolean) {
    if ( !e ) {
      return
    }
    // this.formModal.show();
    this.activeAdd = true;
  }

  closeModal(band: boolean) {
    if ( band ) {
      // this.formModal.hide();
      this.activeAdd = false;
    }

    this.idSettings = 0;
    this.coachSchedule = false;
    this.loadData();
    this.renderer();
  }

  
  /* Section Update */
  onEdit() {
    this.coachSchedule = [];
    this.coachSchedule = this.data;
      
    // this.formModal.show();
    this.activeAdd = true;
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
    let resp = await this.avaivilitySvr.delete(this.id);
    if ( resp != null || resp != undefined ) {
      let  { status } = resp;

      if ( status !== undefined && status === 200 ) {
        this.id = 0
        this.formModalDelete.hide();
        this.alertSvc.showAlert(1, 'Success', resp?.comment)
        this.renderer();
        this.loadData();
      } else {
        this.alertSvc.showAlert(4, 'Error', resp?.comment);
      }   
    } else {
      this.alertSvc.showAlert(4, 'Error', 'Error');
    }
  }
  // End Section: Modal Delete

  /* Section Render & Destoy */
  renderer() {
    this.dtElement?.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
    });
  }

  ngOnDestroy(): void {
    // this.renderer
    this.dtTrigger.unsubscribe();
  }

}
