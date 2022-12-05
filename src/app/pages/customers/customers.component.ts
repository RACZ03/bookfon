import { Component, OnInit } from '@angular/core';
import { CustomersService } from 'src/app/@core/services/customers.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  public data: any[] = [];
  constructor(
    private customerSvc: CustomersService,
  ) { 
    this.loadData();
  }

  ngOnInit() {
  }

  async loadData() {
    let data = await this.customerSvc.getAllUsers();
    console.log(data);
  } 
 
}
