import { Component, Input, OnInit } from '@angular/core';
declare var window: any;

@Component({
  selector: 'app-tearm-users-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() userList: any[] = [];
  public formModalNew: any;

  public scrollOptions: any[] = [
    { title: 'Staff permissions', active: true },
  ];
  public optionSelected: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.formModalNew = new window.bootstrap.Modal(
      document.getElementById('modalNewStaff')
    );
  }

  changeOptions(e: any, index: number) {
    for (let i = 0; i < this.scrollOptions.length; i++) {
      this.scrollOptions[i].active = false;

      if ( i == index )
        this.scrollOptions[i].active = true;
    }
    this.optionSelected = index;
  }

  showModal(e: boolean = false) {
    if ( !e ) {
      return
    }

    this.formModalNew.show();
  }

  closeModal(band: boolean) {

    if ( band )
      this.formModalNew.hide();

    // this.renderer();
    // this.loadAppointments();
  }

  /* Section Render & Destoy */
  // renderer() {
  //   if ( this.dtElement !== undefined ) {
  //     this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //       // Destroy the table first
  //       dtInstance.destroy();
  //     });
  //   }
  // }
}
