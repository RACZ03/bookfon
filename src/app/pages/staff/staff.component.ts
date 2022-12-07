import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss'],
})
export class StaffComponent implements OnInit {
  editStaff: boolean = false;
  newStaff: boolean = false;
  activeTab: number = 0;
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
