import { Component, OnInit, EventEmitter, Output,ViewChild } from '@angular/core';
import { Staff } from '../models/staff';
import { StaffService } from '../../../@core/services/staff.service';
import { staffItem } from 'src/app/@core/Interfaces/Staff';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss'],
})
export class AllComponent implements OnInit {
  @Output() selectedStaff = new EventEmitter();
  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  public data: any[] = [];
  status: number = 0;
  message: string = '';
  comment: string = '';

  constructor(private staffService: StaffService) {}

  ngOnInit(): void {
    this.loadData();
    this.dtOptions = {
      pagingType: "simple_numbers",
      pageLength: 5,
      scrollX: true,
      autoWidth: false,
      destroy: true,
      responsive: true,
      dom: 'Bfrtip',
      searching: true,
      search: false,
      info: false,
    }
  }

  editStaff(staff: object) {
    this.selectedStaff.emit(staff);
  }

  loadData() {
    this.staffService.getAllStaff().then((response) => {
      this.data = response?.data;
      this.status = response?.status;
      this.message = response?.message;
      this.comment = response?.comment;
      this.dtTrigger.next(this.dtOptions);
    });
  }
}
