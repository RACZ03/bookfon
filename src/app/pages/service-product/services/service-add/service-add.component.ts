import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service-add',
  templateUrl: './service-add.component.html',
  styleUrls: ['./service-add.component.scss']
})
export class ServiceAddComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // selectedStaff( id: number, position: number ) {
  //   if ( id === 0 ) {
  //     return;
  //   } 
  //   let element = this.el.nativeElement.querySelector(`.element-${position}`);
  //   // clear all selected
  //   for (let i = 0; i < this.staffList.length; i++) {
  //     let element = this.el.nativeElement.querySelector(`.element-${i}`);
  //     element.classList.remove('active');
  //   }
  //   element.classList.toggle('active');

  //   this.filter(1, id);
  // }

}
