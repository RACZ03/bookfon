import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BusinessService } from '../../../../@core/services/business.service';

@Component({
  selector: 'app-public-details',
  templateUrl: './public-details.component.html',
  styleUrls: ['./public-details.component.scss']
})
export class PublicDetailsComponent implements OnInit {

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
      publicBusinessName: ['', [Validators.required ]],
      supportEmail: ['', Validators.required],
      supporPhoneNumber: ['', Validators.required],
      supporAddress: ['', Validators.required],
      addressLine1: ['', Validators.required],
      addressLine2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', [Validators.required ]],
      statementDescriptor: ['', Validators.required],
      shortenedDescriptor: ['', Validators.required],
      bussinessWebSide: ['', Validators.required],
      supporWebSide: ['', Validators.required],
      privacyPolicy: ['', Validators.required],
      termsService: ['', Validators.required],
     });
  }

  async getBusinessData(){
    let resp = await this.businessSvc.findById(this.identity.businessList[0].id);
    let { data } = resp;
    if (resp.status === '200')
    {
      this.ModalForm.reset({
        publicBusinessName: data.name,
        supportEmail: data.supportEmail,
        supporPhoneNumber: ['', Validators.required],
        supporAddress: ['', Validators.required],
        addressLine1: data.address,
        addressLine2: ['', Validators.required],
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        statementDescriptor: data.longDescription,
        shortenedDescriptor: data.shortDescription,
        bussinessWebSide: ['', Validators.required],
        supporWebSide: data.supportWebsite,
        privacyPolicy: data.privacyPolicy,
        termsService: data.termsOfService
      });
    }
    console.log(resp);
  }

  onUpdate(){}

}
