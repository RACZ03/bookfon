import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {


  public scrollOptions: any[] = [
    { title: 'All Service', active: true },
    { title: 'Categories', active: false },
    { title: 'Sub-Categories', active: false },
   // { title: 'Clasifications', active: false },
   // { title: 'Tax rates', active: false },
    { title: 'Promotions', active: false },
    { title: 'Coupons', active: false },
   // { title: 'Subcriptions', active: false },
   { title: 'Wallet cashback', active: false },
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
