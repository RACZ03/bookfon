import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from 'src/app/@core/services/services.service';
import { AlertService } from 'src/app/@core/utils/alert.service';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.scss']
})
export class AddCategoriesComponent implements OnInit {

  public title: string = 'New Category';
  public butonFalse = true;


  @Output() onClose = new EventEmitter<boolean>();

  @Input() set dataupdateCategories(value: any) {
    if ( value !== null || value !== undefined )
      this.loadDataForm(value);
  }
  Categoryadd!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private ServiceSrv: ServicesService,
    private alertSvc: AlertService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.Categoryadd = this.initForms();
    this.loadDataForm();
  }


  loadDataForm(data: any = null) {
    if ( this.Categoryadd == undefined )
      return;

   this.title = ( data == null || data == undefined ) ? 'New Category' : 'Update  Category';

   if(data?.id != null && data?.id != undefined){
    this.butonFalse= false;
   }

      this.Categoryadd.reset({
       id: (data == null) ? 0 : data?.id,
       name: (data == null) ? '' : data?.name,
       description: (data == null) ? '' : data?.description,
      });
  }

async addCategories(){
    if ( this.Categoryadd.invalid ) 
    return;

    let resp = await this.ServiceSrv.postCategory(this.Categoryadd.value);
    if ( resp != null || resp != undefined ) {
      if(resp.status == 200){
        this.alertSvc.showAlert(1, resp?.comment, 'Success')
        this.loadDataForm();
      }else{
        this.alertSvc.showAlert(2, resp?.comment, 'Error')
      }
    }
  }


  async onSubmit() {
    // console.log('Click')
    if ( this.Categoryadd.invalid ) 
      return

    // Send Data
   let resp = await this.ServiceSrv.postCategory(this.Categoryadd.value);
    if ( resp != null || resp != undefined ) {
      let { status } = resp;
      if ( status == 200 ) {
        this.alertSvc.showAlert(1, resp?.comment, 'Success')
         this.loadDataForm();
         this.onClose.emit(true);
      } else {
        this.alertSvc.showAlert(4, resp?.comment, 'Error')
      }
    } else {
      this.alertSvc.showAlert(4, 'Error al guardar', 'Error')
    }
   // window.location.reload();
  }

  validInput(name: string) {
    return this.Categoryadd.get(name)?.touched && this.Categoryadd.get(name)?.errors?.['required'];
  }

  initForms(): FormGroup {
    return this.fb.group({
      id: [''],
      name: ['', [Validators.required ]],
      description: ['', [Validators.required ]],
    })
  }
  
}
