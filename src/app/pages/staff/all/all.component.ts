import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { staffItem } from 'src/app/@core/Interfaces/Staff';
import { StaffService } from 'src/app/@core/services/staff.service';
import { Staff } from '../models/staff';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss'],
})
export class AllComponent implements OnInit {
  @Output() selectedStaff = new EventEmitter();
  staff: staffItem[] = [];
  id: number = 0;
  status: number = 0;
  message: string = '';
  comment: string = '';

  constructor(private staffService: StaffService) {}

  ngOnInit(): void {
    this.loadStaff();
  }

  editStaff(id : number) {
   //console.log(id);
    this.selectedStaff.emit(id);
  }

  loadStaff() {
    this.staffService.getAllStaff().then((response: any) => {
      this.staff = response?.data;
      this.status = response?.status;
      this.message = response?.message;
      this.comment = response?.comment;
      //console.log(this.staff);
    });
  }
}
