import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.scss']
})
export class ModalDeleteComponent implements OnInit {


  @Output() delete: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() message:string="";
  @Input() btnYes:string="";

  constructor() { }

  ngOnInit(): void {
    if(this.message==""){
      this.message="Do you really want to delete this record? This process cannot be undone."
    };
    if(this.btnYes==""){
      this.btnYes="Delete";
    }
  }

  onDelete() {
    this.delete.emit(true);
  }

  onCloseModal() {
    this.delete.emit(false);
  }

}
