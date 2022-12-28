import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { EventWorkshopService } from 'src/app/@core/services/event-workshop.service';
import { AlertService } from 'src/app/@core/utils/alert.service';

declare var window: any;

@Component({
  selector: 'app-categories-workshop',
  templateUrl: './categories-workshop.component.html',
  styleUrls: ['./categories-workshop.component.scss']
})
export class CategoriesWorkshopComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();


  public data: any[] = [];
  public module: any = false;
  public idSelected: number = 0;
  public title: string = 'Workshop Categories'; 

  public formModal: any;
  public formModalDelete: any;
  public permissions: any[]=[];
  public id: number = 0;

  constructor(
    private eventWorkshopSvc : EventWorkshopService,
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
      document.getElementById('modalNewCategoriesWorkshop')
    );
    this.formModalDelete = new window.bootstrap.Modal(
      document.getElementById('modalDeleteCategoriesWorkshop')
    );  

  }

  closeModalCategories(band: boolean) {
    if ( band )
      this.formModal.hide();

   this.renderer();
   this.loadData();
  }

  showModalCategoriesAdd(e: boolean) {
    if ( !e ) {
      return
    }

    this.formModal.show();
  }

  async loadData() {
    this.data = [];
    let resp = await this.eventWorkshopSvc.getDataCategory();
    if ( resp != undefined ) {
      if ( resp.status == 200 ) {
        this.data = resp.data;
      } else {
        this.alertSvc.showAlert(3, '', 'No data found');
      }
    }
    if ( this.dtTrigger !== undefined )
      this.dtTrigger.next(this.dtOptions);
  }

  async onEditCategories(category: any) {
    let resp = category;
    if ( resp != undefined ) {
      this.module = resp;
      this.formModal.show();
    }   
   this.renderer();
   this.loadData();
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
    let resp = await this.eventWorkshopSvc.deleteCatalogs(this.id);
    if ( resp != null || resp != undefined ) {
      let  { status } = resp;

      if ( status !== undefined && status == 200 ) {
        this.id = 0
        this.alertSvc.showAlert(1, 'Success', resp?.comment)
        this.formModalDelete.hide();
        this.renderer();
        this.loadData();
      } else {
        this.alertSvc.showAlert(4, 'Error', resp?.comment);
        this.formModalDelete.hide();
        this.renderer();
        this.loadData();
      }   
    } else {
      this.alertSvc.showAlert(4, 'Error', 'Error');
      this.formModalDelete.hide();
        this.renderer();
        this.loadData();
    }
  }

}
