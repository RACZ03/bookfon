import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Staff } from '../models/staff';
import { StaffService } from '../../../@core/services/staff.service';
import { staffItem } from 'src/app/@core/Interfaces/Staff';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss'],
})
export class AllComponent implements OnInit {
  @Output() selectedStaff = new EventEmitter();
  staff: staffItem[] = [];
  status: number = 0;
  message: string = '';
  comment: string = '';

  constructor(private staffService: StaffService) {}

  ngOnInit(): void {
    this.loadStaff();
  }

  editStaff(staff: Staff) {
    this.selectedStaff.emit(staff);
  }

  loadStaff() {
    this.staffService.getAllStaff().then((response) => {
      this.staff = response?.data;
      this.status = response?.status;
      this.message = response?.message;
      this.comment = response?.comment;
      console.log(this.staff);
    });
  }
}
