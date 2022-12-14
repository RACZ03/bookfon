import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ServicesService } from 'src/app/@core/services/services.service';
import { AlertService } from 'src/app/@core/utils/alert.service';
declare var window: any;

@Component({
  selector: 'app-clasifications',
  templateUrl: './clasifications.component.html',
  styleUrls: ['./clasifications.component.scss']
})
export class ClasificationsComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();


  public data: any[] = [];
  public module: any = false;
  public idSelected: number = 0;
  public title: string = 'New Category'; 

  public formModal: any;
  public formModalDelete: any;
  public permissions: any[]=[];



  constructor(
    private readonly fb: FormBuilder,
    private ServiceSvr : ServicesService,
    private alertSvc : AlertService,
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
      document.getElementById('modalNewClasifications')
    );
  }

  closeModalClasifications(band: boolean) {
    if ( band )
      this.formModal.hide();

   this.renderer();
   this.loadData();
  }

  showModaClasificatiosAdd(e: boolean) {
    if ( !e ) {
      return
    }

    this.formModal.show();
  }

  async loadData() {
    this.data = [];
      let resp = await this.ServiceSvr.getdataClasifications();
          let { data } = resp;
            this.data =data || [];
    this.dtTrigger.next(this.dtOptions);
  }

  async onEditClasificatiosns(id: number) {
    let resp = await this.ServiceSvr.findById(id);
    if ( resp != undefined ) {
      let { data, status } = resp;

      if ( status !== undefined && status === 200 ) {
          this.module = data;
          this.formModal.show();
      } else {
        this.alertSvc.showAlert(4, resp?.comment, 'Error');
      }
    } else {
      this.alertSvc.showAlert(4, 'Error', 'Error');
    }
    
  }

  /* Section Render & Destoy */
  renderer() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
  });
  }

  ngOnDestroy(): void {
    this.renderer
    this.dtTrigger.unsubscribe();
  }
  
  searchData(e: any) {
    let value = e.target.value;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.search(value).draw();
    });
  }

}
