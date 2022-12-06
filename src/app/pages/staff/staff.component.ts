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

  constructor() {}

  ngOnInit(): void {}

  selectedStaff(item: any) {
    this.itemStaff = item;
    console.log("item:::",item);
    this.editStaff = true;
  }

  showScreenNewStaff() {
    this.editStaff = false;
    this.newStaff = true;
  }


}
