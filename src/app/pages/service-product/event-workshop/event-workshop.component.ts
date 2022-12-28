import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-workshop',
  templateUrl: './event-workshop.component.html',
  styleUrls: ['./event-workshop.component.scss']
})
export class EventWorkshopComponent implements OnInit {

  public scrollOptions: any[] = [
    { title: 'All Events & Workshops', active: true },
    { title: 'Categories', active: false },
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
