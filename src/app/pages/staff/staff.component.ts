import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss'],
})
export class StaffComponent implements OnInit {
  editStaff: boolean = false;
  activeTab: number = 0;

  constructor() {}

  ngOnInit(): void {}

  selectedStaff(event: any) {
    this.editStaff = true;
  }
}
