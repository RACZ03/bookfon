import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { BusinessService } from 'src/app/@core/services/business.service';
import { UsersService } from 'src/app/@core/services/users.service';
import { AlertService } from 'src/app/@core/utils/alert.service';
declare var window: any;

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  

  public formBusiness!: FormGroup;
  @Input() identity: any;

  constructor(
    private readonly fb: FormBuilder,
    private businessSvc: BusinessService,
    private alertSvc: AlertService
  ) { 
  }

  ngOnInit(): void {
    this.formBusiness = this.initForms();
    this.loadBusiness();
  }

  async loadBusiness() { 
    let resp = await this.businessSvc.findById(this.identity.businessList[0].id);
    let { data } = resp;
    // console.log(data);
    if (resp.status === '200')
    {
      this.formBusiness.reset({
        id: data.id,
        name: data.name,
      });
    }
  }

  initForms(): FormGroup {
    return this.fb.group({
     id: [''],
     name: ['', [Validators.required ]]
    });
  }

  validInput(name: string) {
    return this.formBusiness.get(name)?.touched && this.formBusiness.get(name)?.errors?.['required'];
  }

  async onSubmit() {
    let resp = await this.businessSvc.update(this.formBusiness.value);

    if (resp.status === '200'){
      this.loadBusiness();
      this.alertSvc.showAlert(1, '', 'Business updated successfully');
    } else if ( resp.status === '403') {
      this.alertSvc.showAlert(2, '', 'Access denied');
    } else {
      this.alertSvc.showAlert(4, '', 'Error updating business');
    }
  }
}
