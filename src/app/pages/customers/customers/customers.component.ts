import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersListComponent implements OnInit {

  public scrollOptions: any[] = [
    { title: 'All', active: true },
    // { title: 'Account', active: false },
    // { title: 'Teams', active: false },
    // { title: 'Top Customers', active: false },
    // { title: 'Repeat Custumers', active: false },
    // { title: 'First-time Custumers', active: false },
    // { title: 'Recent Customers', active: false },
    // { title: 'High Refunds', active: false },
    // { title: 'High Disputes', active: false },
  ];
  public optionSelected: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  changeOptions(e: any, index: number) {
    for (let i = 0; i < this.scrollOptions.length; i++) {
      this.scrollOptions[i].active = false;

      if ( i == index )
        this.scrollOptions[i].active = true;
    }
    this.optionSelected = index;
  }
}
