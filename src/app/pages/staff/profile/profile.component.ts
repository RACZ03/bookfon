import { Component, OnInit,EventEmitter,Input, HostListener} from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Input() itemStaff: any;
  public idStaff: number = 0;

  @Input() set setIdProfile(id: number){
    this.idStaff = id;
  };
  public formModalPositionCoach: any;


  public scrollOptions: any[] = [
    { title: 'Profile', active: true },
    { title: 'Schedule', active: false },
    { title: 'Availability', active: false },
    { title: 'Services', active: false },
    // { title: 'Branches', active: false },
  ];
  public optionSelected: number = 0;
  constructor() { }

  ngOnInit(): void {
    // console.log("itemStaff:::",this.itemStaff);
  }

  changeOptions(e: any, index: number) {
    for (let i = 0; i < this.scrollOptions.length; i++) {
      this.scrollOptions[i].active = false;

      if ( i == index )
        this.scrollOptions[i].active = true;
    }
    this.optionSelected = index;
  }

  // listen to event click in button by id
  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (event.target.id == "showModalOrderStaff") {
      this.formModalPositionCoach.show();
    }
  }
}
