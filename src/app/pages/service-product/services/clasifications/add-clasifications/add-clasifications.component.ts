import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from 'src/app/@core/services/services.service';
import { AlertService } from 'src/app/@core/utils/alert.service';

@Component({
  selector: 'app-add-clasifications',
  templateUrl: './add-clasifications.component.html',
  styleUrls: ['./add-clasifications.component.scss']
})
export class AddClasificationsComponent implements OnInit {

  public title: string = 'New Clasifications';


  @Output() onClose = new EventEmitter<boolean>();

  @Input() set dataupdateClasifications(value: any) {
    if ( value !== null || value !== undefined )
      this.loadDataForm(value);
  }
  Clasificationsadd!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private ServiceSrv: ServicesService,
    private alertSvc: AlertService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.Clasificationsadd = this.initForms();
    this.loadDataForm();
  }


  loadDataForm(data: any = null) {
    if ( this.Clasificationsadd == undefined )
      return;

   this.title = ( data == null || data == undefined ) ? 'New Clasifications' : 'Update  Clasifications';

      this.Clasificationsadd.reset({
       id: (data == null) ? 0 : data?.id,
       name: (data == null) ? '' : data?.name,
       description: (data == null) ? '' : data?.description,
      });
  }

  async onSubmit() {
    if ( this.Clasificationsadd.invalid ) 
      return


    // Send Data
   let resp = await this.ServiceSrv.postClasifications(this.Clasificationsadd.value);
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
    return this.Clasificationsadd.get(name)?.touched && this.Clasificationsadd.get(name)?.errors?.['required'];
  }

  initForms(): FormGroup {
    return this.fb.group({
      id: [''],
      name: ['', [Validators.required ]],
      description: ['', [Validators.required ]],
    })
  }
}
