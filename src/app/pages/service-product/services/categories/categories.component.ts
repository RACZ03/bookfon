import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ServicesService } from 'src/app/@core/services/services.service';
declare var window: any;

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

 //dtOptions: DataTables.Settings = {};
 //dtTrigger: Subject<any> = new Subject<any>();

   public data: any[] = [];
  public module: any = false;
  public idSelected: number = 0; 

  public formModal: any;
  public formModalDelete: any;
  public permissions: any[]=[];


  @Input() set dataupdateCategories(value: any) {
    if ( value !== null || value !== undefined )
      this.loadDataForm(value);
  }


  constructor(
    private readonly fb: FormBuilder,
    private ServiceSvr : ServicesService,
  ) { }

  ngOnInit(): void {
    this.loadData();
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('modalNewCategories')
    );
  }


  loadDataForm(data: any = null) {
    if ( this.ServiceSvr == undefined )
      return;

   // this.title = ( data == null || data == undefined ) ? 'Nuevo Servicio' : 'Actualizar Servicio';

   // this.branchOfficeU = data?.offices
   // let arrayOffices :any [] = [];
   // if(this.branchOfficeU !== undefined){
   //  for (let i = 0; i < this.branchOfficeU?.length; i++) {
   //    arrayOffices.push(this.branchOfficeU[i].id) 
   //  }
   // }
   // this.Serviceadd.reset({
   //  id: (data == null) ? 0 : data?.id,
   //  name: (data == null) ? '' : data?.name,
   //  description: (data == null) ? '' : data?.description,
   //  minutes: (data == null) ? '' : data?.minutes,
   //  color: (data == null) ? '' : data?.color,
   //  brachoffices: (arrayOffices == null) ? [] : arrayOffices,
   // });
  }

  closeModalCategories(band: boolean) {
    if ( band )
      this.formModal.hide();

   //this.renderer();
   //this.loadData();
  }

  showModalCategoriesAdd(e: boolean) {
    if ( !e ) {
      return
    }

    this.formModal.show();
  }

  async loadData() {
    this.data = [];
      let resp = await this.ServiceSvr.getData();
      console.log(resp);
      if ( resp != undefined || resp != null ) {
        if ( resp.status === 404 ) {
         // this.alertSvc.showAlert(4, resp.statusText, 'Error');
        } else {
          let { data } = resp;
          if ( data !== undefined ) {
            this.data = data || [];
          }
        }
      } else {
        //this.alertSvc.showAlert(3, 'No results found', '');
      }
   // this.dtTrigger.next(this.dtOptions);
  }
  
}
