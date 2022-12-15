import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ServicesService } from 'src/app/@core/services/services.service';
import { StaffService } from 'src/app/@core/services/staff.service';
import { AlertService } from 'src/app/@core/utils/alert.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  public idStaff: number = 0;
  public ServiceData: any [] = [];
  public data: any [] = [];
  public dataSelectAll: any [] = [];
  ServiceaddStaffFomr!: FormGroup;
  public isEdit: boolean = false;

  @Input() set setIdProfile(id: number){
    this.idStaff = id;
   this.loadData(this.idStaff)
  }; 

  constructor(
     public serviceSvr : ServicesService,
     private staffSvr: StaffService,
     private alertSvc: AlertService,
     private router: Router,
      private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.ServiceaddStaffFomr = this.initForms();
    this.loadDataService();
  }

   async loadData(id: number){
    this.idStaff = id;
    let resp = await this.staffSvr.getServicesByStaff(id);
    console.log(resp);
     let data = resp.data;
    let arrayServicestaff: any[] = [];
     if (data?.content !== undefined) {
      let { content } = data || [];
      this.dataSelectAll = content;
      this.isEdit = true;
       for (let i = 0; i < content.length; i++) {
        
         arrayServicestaff.push(content[i].idService);
       }
     }
  //  console.log(arrayServicestaff);

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
    
    let data = this.ServiceaddStaffFomr.value.services;
    //console.log(this.ServiceaddStaffFomr.value.services);
    let arrayServiceStaffU: any[] = [];
    for (let i = 0; i <data?.length; i++) {
      let found = this.dataSelectAll.find((x: any) => x.idService == data[i]);
      arrayServiceStaffU.push({
         idService: data[i],
         idStaff : this.idStaff 
      });
      if (found != undefined) {
        arrayServiceStaffU[i].id = found.id;
      }
    }

    // add elements deleted
    for (let i = 0; i < this.dataSelectAll.length; i++) {
      let element = this.dataSelectAll[i];
      let found = arrayServiceStaffU.find((x: any) => x.idService == element.idService);
      if (found == undefined) {
        arrayServiceStaffU.push({
          id: element.id,
          idService: element.idService,
          idStaff : this.idStaff,
          pasive: true
        });
      }
    }

    //console.log(arrayServiceStaff);
     let resp = await this.staffSvr.saveServiceToStaff(arrayServiceStaffU, this.isEdit);
     
      if (resp.status == 200) {
        this.alertSvc.showAlert(1, resp?.comment, 'Success');
        
      }
      else {
        this.alertSvc.showAlert(4, resp?.comment, 'Error');
      }

  }

}
