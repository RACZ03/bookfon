import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogsService } from 'src/app/@core/utils/catalogs.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {

  public title: string = 'Edit Customer';
  formEdit!: FormGroup;
  public sexList: any[] = [];
  @Input() set customer(obj: any) {
    this.loadForm(obj);
  }

  constructor(
    private readonly fb: FormBuilder,
    private catalogSvc: CatalogsService,
  ) { 
  }

  ngOnInit(): void {
    this.formEdit = this.initForms();
    this.loadSex();
  }

  onSubmit() {
    
  }

  async loadSex() {
    this.sexList = [];
    let resp = await this.catalogSvc.getSexs();
    // console.log(resp)
    if ( resp?.status == '200' ) {
      let { data } = resp;
      this.sexList = data;
    }
  }

  loadForm(obj: any = null) {
    if ( obj === null || obj === undefined ) {
      return
    }

    this.formEdit.reset({
      id: obj.id,
      firstName: obj.firstName,
      lastName: obj.lastName,
      phone: obj.phone,
    });
    let { idSex } = obj;
    for (let i = 0; i < this.sexList.length; i++) {
      if ( this.sexList[i].id == idSex ) {
        // check the radio button
        let radio = document.getElementById('radioSex'+i) as HTMLInputElement;
        radio.checked = true;
      }
    }
  }

  validInput(name: string) {
    return this.formEdit.get(name)?.touched && this.formEdit.get(name)?.errors?.['required'];
  }

  validInputMin(name: string) {
    return this.formEdit.get(name)?.touched && this.formEdit.get(name)?.errors?.['minlength'];
  }

  validInputMax(name: string) {
    return this.formEdit.get(name)?.touched && this.formEdit.get(name)?.errors?.['maxlength'];
  }

  initForms(): FormGroup {
    return this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      // email: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)] ],
    })
  }

}
