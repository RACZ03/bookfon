import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { StaffService } from 'src/app/@core/services/staff.service';

@Component({
  selector: 'app-modal-position',
  templateUrl: './modal-position.component.html',
  styleUrls: ['./modal-position.component.scss']
})
export class ModalPositionComponent implements OnInit {

  @Output() onClose = new EventEmitter<boolean>();

  @Input() data: any[] = [];
  @Output() updateOrder = new EventEmitter<any[]>();
  public newData: any[] = [];

  //public title: string = 'Coach order settings';

  constructor(
    private serviceStaff : StaffService,
  ) { }

  ngOnInit(): void {
  }

     drop($event:CdkDragDrop <number[]>) {
        if ( $event.previousContainer === $event.container ) {
         moveItemInArray($event.container.data, $event.previousIndex, $event.currentIndex);
       }
      }

 async  onSave() {
  console.log('Hi');
  this.newData = [];
  let identity = JSON.parse(localStorage.getItem('businessSelected') || '{}');
  //s console.log(identity, "identity");
  for (let i = 0; i < this.data.length; i++) {
    let obj = {
      id: this.data[i].id,
      order: i+1,
      idBusiness : identity.id
    }
    this.newData.push(obj);
  }
  let resp = await this.serviceStaff.changeOrderStaff(this.newData);
  // console.log(resp)
  if ( resp?.status == 200 ) {
    this.onClose.emit(true);
  }
 
  }

}



