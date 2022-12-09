import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-you-bussines',
  templateUrl: './you-bussines.component.html',
  styleUrls: ['./you-bussines.component.scss']
})
export class YouBussinesComponent implements OnInit {

  public identity: any;

  public scrollOptions: any[] = [
    { title: 'Account name', active: true },
    { title: 'Public details', active: false },
    { title: 'Business details', active: false },
    // { title: 'Linked external accounts', active: false },
    // { title: 'Bank accounts and scheduling', active: false },
    // { title: 'Tax details', active: false },
    // { title: 'Branding', active: false },
    // { title: 'Customers emails settings', active: false },
    // { title: 'Staff SMS settings', active: false },
    // { title: 'Amind team SMS settings', active: false },
    // { title: 'Branches', active: false },
  ];

  public optionSelected: number = 0;

  constructor() { }

  ngOnInit(): void {
    let data = localStorage.getItem('identity') || '{}';
    this.identity = JSON.parse(data);
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
