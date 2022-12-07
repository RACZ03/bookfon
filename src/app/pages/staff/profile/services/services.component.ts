import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
     public staffService : StaffService,
      private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.ServiceaddStaffFomr = this.initForms();
  }

  loadData(id: number){
    this.idStaff = id;
    
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
    
    this.data = this.ServiceaddStaffFomr.value.id;
    let arrayServiceStaff: any[] = [];
    for (let i = 0; i < this.data?.length; i++) {
      arrayServiceStaff.push({
         idService: this.data[i],
         idstaff : this.idStaff });
    }
   
    
  }

}
