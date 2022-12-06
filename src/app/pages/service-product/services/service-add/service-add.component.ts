import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ServicesService } from 'src/app/@core/services/services.service';
import { AlertService } from 'src/app/@core/utils/alert.service';
declare var window: any;

@Component({
  selector: 'app-service-add',
  templateUrl: './service-add.component.html',
  styleUrls: ['./service-add.component.scss']
})
export class ServiceAddComponent implements OnInit {
 
  public module: any = false;
  Serviceadd!: FormGroup;
  public data: any [] = [];
  public categoryData: any[] = [];
  public subcategoryData: any[] = [];
  public formModalCategorie: any;
  public formModal: any;
    // hasta aqui
    @Output() onClose = new EventEmitter<boolean>();
 

    @Input() set dataUpdateServices(value: any) {
      if ( value !== null && value !== undefined)
        this.loadDataForm(value);
    }
  

  constructor(
     private readonly fb: FormBuilder,
     private serviceSvr : ServicesService,
     private alertSvc: AlertService,
     private router:Router
     ) { }

     async ngOnInit(): Promise<void> {
      this.formModalCategorie = new window.bootstrap.Modal(
        document.getElementById('modalNewCategories')
      );
      this.formModal = new window.bootstrap.Modal(
        document.getElementById('modalNewSubCategories')
      );
      this.Serviceadd = this.initForms();
      this.loadData();
      this.loadDataCategories();
      this.loadDataSubCategory();
    }

      async loadDataSubCategory() {

      this.subcategoryData = [];
      let resp = await this.serviceSvr.getDataSubCategories();
      if ( resp != undefined || resp != null ) {
        if ( resp.status === 404 ) {
          this.alertSvc.showAlert(4, resp.statusText, 'Error');
        } else {
          let { data } = resp;
          if ( data !== undefined ) {
            this.subcategoryData = data || [];
          }
        }
      } else {
        this.alertSvc.showAlert(3, 'No results found', '');
      }
      }

   async loadDataCategories() {
      this.categoryData = [];
      let resp = await this.serviceSvr.getDataCategory();
  
      if ( resp != undefined || resp != null ) {
        if ( resp.status === 404 ) {
          this.alertSvc.showAlert(4, resp.statusText, 'Error');
        } else {
          let { data } = resp;
          if ( data !== undefined ) {
            this.categoryData = data || [];
          }
        }
      } else {
        this.alertSvc.showAlert(3, 'No results found', '');
      }
    }

    initForms(): FormGroup {
      return this.fb.group({
        id: [''],
        name: ['', [Validators.required]],
        description: [''],
        categories : [],
        subcategories: [],
        duration: [''],
        price: [''],
      })
    }

    async loadData() {
      this.data = [];
       // let resp = await this.ModuleSrv.getData();
  
    //   if ( resp != undefined || resp != null ) {
    //     if ( resp.status === 404 ) {
    //       this.alertSvc.showAlert(4, resp.statusText, 'Error');
    //     } else {
    //       let { data } = resp;
    //       if ( data !== undefined ) {
    //         for (let i = 0; i < data.length; i++) {
    //           data[i].permisos = {ver: false, crear: false, editar: false, eliminar: false};
    //         }
    //         this.data = data || [];
    //       }
    //     }
    //   } else {
    //     this.alertSvc.showAlert(3, 'No results found', '');
    //   }
    // this.dtTrigger.next(this.dtOptions);
    }

    async loadDataForm(data: any = null) {
      if ( this.Serviceadd == undefined )
        return;
      //this.title = ( data == null || data == undefined ) ? 'Nuevo Rol y Permiso' : 'Actualizar Rol y Permiso';
  
        this.Serviceadd.reset({
          id: (data == null) ? 0 : data?.id,
          name: (data == null) ? '' : data?.name,
          description: (data == null) ? '' : data?.description,
          duration: (data == null) ? '' : data?.duration,
          price: (data == null) ? '' : data?.price,
          categories: (data == null) ? '' : data?.categories,
          subcategories: (data == null) ? '' : data?.subcategories,

         });  
         
        // this.cargaTable(data.id_profile);
    //  let permisos = await this.RolSrv.findById(data.id)
     // let detalle = permisos?.detail;
  
     //  for (let i = 0; i < detalle?.length; i++) {
     //      this.lista[i] = detalle[i].permissions.split('-');
     // }
     // this.asignarPermisos(this.lista);
      
    }

    validInput(name: string) {
      return this.Serviceadd.get(name)?.touched && this.Serviceadd.get(name)?.errors?.['required'];
    }


    async onSubmit() {
      if ( this.Serviceadd.invalid ) 
        return;

      let data = this.Serviceadd.value;
     // console.log(data.categories);
      let categoriesnew: any []=[];
      let subcategoriesnew: any []=[];
      categoriesnew.push({id: data.categories});
      subcategoriesnew.push({id: data.subcategories});
      let recurrentPayment = false;
      let recurrent = <HTMLInputElement>document.getElementById('btnradio2');
      if (recurrent.checked) {
        recurrentPayment=true;
      }

        
      let resp = await this.serviceSvr.postService(this.Serviceadd.value, categoriesnew, subcategoriesnew, recurrentPayment);
       if ( resp != null || resp != undefined ) {
         let { status } = resp;
         if ( status == 201 ) {
           this.alertSvc.showAlert(1, resp?.comment, 'Success')
           this.loadDataForm();
           //this.onClose.emit(true);
          
         } else {
           this.alertSvc.showAlert(4, resp?.comment, 'Error')
         }
       } else {
         this.alertSvc.showAlert(4, 'Error al guardar', 'Error')
       }
       this.router.navigate(['/pages/services']);
    }

    ///------------------CERRAR MODAL CATEGORIES------------------///
    
  closeModalCategories(band: boolean) {
    if ( band )
      this.formModalCategorie.hide();
      this.loadDataCategories();
  }

  showModalCategoriesAdd(e: boolean) {
    if ( !e ) {
      return
    }
    this.formModalCategorie.show();
    this.loadDataCategories();
  }

  //------------------CERRAR MODAL   SUB_CATEGORY------------------///
  closeModalSubCategories(band: boolean) {
    if ( band )
      this.formModal.hide();
       this.loadData();
       this.loadDataSubCategory();
  }

  showModalSubCategoriesAdd(e: boolean) {
    if ( !e ) {
      return
    }
    this.formModal.show();
    this.loadDataSubCategory();
  }

}
