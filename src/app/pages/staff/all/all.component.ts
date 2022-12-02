import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import {Staff} from '../models/staff';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit {
  @Output () selectedStaff = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  editStaff(staff: Staff) {
    this.selectedStaff.emit(staff);
  }
}
