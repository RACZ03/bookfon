import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BusinessService } from 'src/app/@core/services/business.service';

@Component({
  selector: 'app-business-details',
  templateUrl: './business-details.component.html',
  styleUrls: ['./business-details.component.scss']
})
export class BusinessDetailsComponent implements OnInit {


  public ModalForm!: FormGroup;
  @Input() identity: any;
  constructor(
    private businessSvc: BusinessService,
    private readonly fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    console.log(this.identity);
    this.getBusinessData();
    this.ModalForm = this.initForm();
  }

  initForm(): FormGroup{
    return this.fb.group({
      id: [''],
      legalBusinessName: ['', [Validators.required ]],
      doingBusinessAs: ['', Validators.required],
      registerBusinessAddress: ['', Validators.required],
      address: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', [Validators.required ]],
      phone: ['', Validators.required],
      website: ['', Validators.required],
      industry: ['', Validators.required],
      longDescription: ['', Validators.required],
     });
  }

  async getBusinessData(){
    let resp = await this.businessSvc.findById(this.identity.businessList[0].id);
    let { data } = resp;
    if (resp.status === '200')
    {
      this.ModalForm.reset({
        id: data.id,
        legalBusinessName: data.legalBusinessName,
        doingBusinessAs: data.doingBusinessAs,
        registerBusinessAddress: data.registerBusinessAddress,
        address: data.address,
        state: data.state,
        zipcode: data.zipcode,
        phone: data.phone,
        website: data.website,
        industry: data.industry,
        longDescription: data.longDescription,
      });
    }
    console.log(resp);
  }

  async onUpdate(){
    let data = {
      id: this.ModalForm.value.id,
      legalBusinessName: this.ModalForm.value.legalBusinessName,
      doingBusinessAs: this.ModalForm.value.legalBusinessName,
      registerBusinessAddress: this.ModalForm.value.legalBusinessName,
      address: this.ModalForm.value.legalBusinessName,
      state: this.ModalForm.value.legalBusinessName,
      zipCode: this.ModalForm.value.legalBusinessName,
      phone: this.ModalForm.value.zipCode,
      website: this.ModalForm.value.website,
      industry: this.ModalForm.value.industry,
      longDescription: this.ModalForm.value.longDescription,
    }

    let resp = await this.businessSvc.update(data);

    if (resp.status === '200'){
      window.location.reload();
    }
  }


}
