import { Component, Input, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/@core/services/services.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  public idStaff: number = 0;
  public ServiceData: any [] = [];

  @Input() set setIdProfile(id: number){
    this.idStaff = id;
  }; 

  constructor(
    public serviceSvr : ServicesService,
  ) { }

  ngOnInit(): void {
    this.loadDataService();
  }

  async loadDataService(){
    let resp = await this.serviceSvr.getServicesByBusinesset();
    this.ServiceData = resp.data;
    console.log(this.ServiceData);
  }

}
