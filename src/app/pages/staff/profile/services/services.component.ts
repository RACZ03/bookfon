import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from 'src/app/@core/services/services.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  public idStaff: number = 0;
  public ServiceData: any [] = [];
  public serviceSelected: any [] = [];
  ServiceaddStaffFomr!: FormGroup;

  @Input() set setIdProfile(id: number){
    this.idStaff = id;
  }; 

  constructor(
    public serviceSvr : ServicesService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.ServiceaddStaffFomr = this.initForms();
    this.loadDataService();
  }

  async loadDataService(){
    let resp = await this.serviceSvr.getServicesByBusinesset();
    this.ServiceData = resp.data;
   // console.log(this.ServiceData);
  }

  initForms(): FormGroup {
    return this.fb.group({
      id: [''],
      name: [''],
    });
  }


  onSubmit() {
    if ( this.ServiceaddStaffFomr.invalid ) 
    return;
    
    //this.serviceSelected = data?.categoriesList;
    let arrayServiceStaff: any[] = [];
    for (let i = 0; i < this.serviceSelected?.length; i++) {
      arrayServiceStaff.push({
         idService: this.serviceSelected[i].id,
         idstaff : this.idStaff });
    }

  console.log(arrayServiceStaff);
    
  }

}
