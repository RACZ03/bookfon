import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss'],
})
export class StaffComponent implements OnInit {
  @Input() set setIdProfile(id: number){
    this.idStaff = id;
    console.log(this.idStaff , "serstaffvice");
  }; 

  editStaff: boolean = false;
  itemStaff:any;
  newStaff: boolean = false;
  activeTab: number = 1;
  public idStaff: number = 0;

  constructor() {}

  ngOnInit(): void {}

  selectedStaff(item: any) {
    this.idStaff= item.id;
    this.itemStaff = item;    
    this.editStaff=true;
  }

  showScreenNewStaff() {
    this.editStaff = false;
    this.newStaff = true;
  }


}
