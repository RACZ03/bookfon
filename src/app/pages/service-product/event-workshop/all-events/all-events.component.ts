import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { EventWorkshopService } from 'src/app/@core/services/event-workshop.service';
import { AlertService } from 'src/app/@core/utils/alert.service';

declare var window: any;

@Component({
  selector: 'app-all-events',
  templateUrl: './all-events.component.html',
  styleUrls: ['./all-events.component.scss']
})
export class AllEventsComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  public data: any[] = [];
  public id: number = 0;
  public formModalDelete: any;

  constructor(
    private eventAndWorkshopSvr: EventWorkshopService,
    public router: Router,
    private alertSvc: AlertService
  ) { 
   // this.permissions = this.permissionsSvc.getPermissions('services');
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
    this.formModalDelete = new window.bootstrap.Modal(
      document.getElementById('modalDeleteEventAndWorkshop')
    );
  }

  searchData(e: any) {
    let value = e.target.value;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.search(value).draw();
    });
  }

  async loadData() {
    this.data = [];
    // let resp = await this.eventAndWorkshopSvr.getAllEnventAndWor();
      // this.data = resp.data;
      // console.log(this.data);
    if ( this.dtTrigger !== undefined )
      this.dtTrigger.next(this.dtOptions);

  }

  editService(id: any){
    this.router.navigate([`/pages/services/updateServices/${id}`]);
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
    // let resp = await this.serviceSvr.deleteService(this.id);
    // if ( resp != null || resp != undefined ) {
    //   let  { status } = resp;

    //   if ( status !== undefined && status == 200 ) {
    //     this.id = 0
    //     this.alertSvc.showAlert(1, 'Success', resp?.comment)
    //     this.formModalDelete.hide();
    //     this.renderer();
    //     this.loadData();
    //   } else {
    //     this.alertSvc.showAlert(4, 'Error', resp?.comment);
    //     this.formModalDelete.hide();
    //     this.renderer();
    //     this.loadData();
    //   }   
    // } else {
    //   this.alertSvc.showAlert(4, 'Error', 'Error');
    //   this.formModalDelete.hide();
    //     this.renderer();
    //     this.loadData();
    // }
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
