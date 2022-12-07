import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss'],
})
export class StaffComponent implements OnInit {
  editStaff: boolean = false;
  itemStaff:any;
  newStaff: boolean = false;
  activeTab: number = 1;
  // activeTab: number = 0;
  public idStaff: number = 0;

  constructor() {}

  ngOnInit(): void {}

  selectedStaff(event: any) {
    this.idStaff= event;
    this.editStaff = true;
  }

  showScreenNewStaff() {
    this.editStaff = false;
    this.newStaff = true;
  }


}
