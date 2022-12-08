import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServicesService } from 'src/app/@core/services/services.service';
import { StaffService } from 'src/app/@core/services/staff.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  public idStaff: number = 0;
  public ServiceData: any [] = [];
  public data: any [] = [];
  ServiceaddStaffFomr!: FormGroup;

  @Input() set setIdProfile(id: number){
    this.idStaff = id;
   this.loadData(this.idStaff)
  }; 

  constructor(
     public serviceSvr : ServicesService,
     private staffSvr: StaffService,
      private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.ServiceaddStaffFomr = this.initForms();
    this.loadDataService();
  }

   async loadData(id: number){
    this.idStaff = id;
    let resp = await this.staffSvr.getServicesByStaff(id);
     let data = resp.data;
    let arrayServicestaff: any[] = [];
     if (data.content !== undefined) {
       for (let i = 0; i < data.content.length; i++) {
         arrayServicestaff.push(data.content[i].id);
       }
     }
    console.log(arrayServicestaff);

    this.ServiceaddStaffFomr.reset({
      services : arrayServicestaff == null ? [] : arrayServicestaff,
    });

  }

  async loadDataService(){
    let resp = await this.serviceSvr.getServicesByBusinesset();
    this.ServiceData = resp.data;
   // console.log(this.ServiceData);
  }

  initForms(): FormGroup {
    return this.fb.group({
      id: [''],
      services: [''],
    });
  }


 async onSubmit() {
    if ( this.ServiceaddStaffFomr.invalid ) 
    return;
    
    let data = this.ServiceaddStaffFomr.value.id;
    console.log(this.data);
    let arrayServiceStaff: any[] = [];
    for (let i = 0; i <data?.length; i++) {
      arrayServiceStaff.push({
         idService: data[i],
         idstaff : this.idStaff });
    }
     let resp = await this.staffSvr.saveServiceToStaff(arrayServiceStaff);
    console.log(resp);
  }

}
