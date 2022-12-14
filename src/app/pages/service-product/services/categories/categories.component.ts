import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ServicesService } from 'src/app/@core/services/services.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AlertService } from 'src/app/@core/utils/alert.service';
declare var window: any;

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

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
  public id: number = 0;

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
      document.getElementById('modalNewCategories')
    );
    this.formModalDelete = new window.bootstrap.Modal(
      document.getElementById('modalDeleteCategories')
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
      let resp = await this.ServiceSvr.getDataCategory();
          let { data } = resp;
            this.data =data || [];
           // console.log(this.data);
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
    let resp = await this.ServiceSvr.deleteCatalogs(this.id);
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
