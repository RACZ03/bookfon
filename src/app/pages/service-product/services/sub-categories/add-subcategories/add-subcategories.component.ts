import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from 'src/app/@core/services/services.service';
import { AlertService } from 'src/app/@core/utils/alert.service';

@Component({
  selector: 'app-add-subcategories',
  templateUrl: './add-subcategories.component.html',
  styleUrls: ['./add-subcategories.component.scss']
})
export class AddSubcategoriesComponent implements OnInit {
  public title: string = 'New Sub-Category';
  public butonFalse = true;


  @Output() onClose = new EventEmitter<boolean>();

  @Input() set dataupdateSubCategories(value: any) {
    if ( value !== null || value !== undefined )
      this.loadDataForm(value);
  }
  SubCategoryadd!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private ServiceSrv: ServicesService,
    private alertSvc: AlertService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.SubCategoryadd = this.initForms();
    this.loadDataForm();
  }


  loadDataForm(data: any = null) {
    if ( this.SubCategoryadd == undefined )
      return;

      if(data?.id != null && data?.id != undefined){
        this.butonFalse= false;
       }
      //console.log(data);
   this.title = ( data == null || data == undefined ) ? 'New Sub-Category' : 'Update  Sub-Category';

      this.SubCategoryadd.reset({
       id: (data == null) ? 0 : data?.id,
       name: (data == null) ? '' : data?.name,
       description: (data == null) ? '' : data?.description,
      });
  }

  async addSubCategories(){
    if ( this.SubCategoryadd.invalid ) 
    return;

    let resp = await this.ServiceSrv.postSubCategory(this.SubCategoryadd.value);
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
    if ( this.SubCategoryadd.invalid ) 
      return


    // Send Data
   let resp = await this.ServiceSrv.postSubCategory(this.SubCategoryadd.value);
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
    return this.SubCategoryadd.get(name)?.touched && this.SubCategoryadd.get(name)?.errors?.['required'];
  }

  initForms(): FormGroup {
    return this.fb.group({
      id: [''],
      name: ['', [Validators.required ]],
      description: ['', [Validators.required ]],
    })
  }
}
