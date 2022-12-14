import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { StaffService } from 'src/app/@core/services/staff.service';
declare var window: any;

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss'],
})
export class StaffComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  @Input() set setIdProfile(id: number){
    this.idStaff = id;
  }; 

  editStaff: boolean = false;
  itemStaff:any;
  newStaff: boolean = false;
  activeTab: number = 1;
  public idStaff: number = 0;
  public showModalOrder: boolean = false;
  public showBtn: boolean = true;
  private identity: any = {};
  public isAdmin: boolean = false;
  
  public module: any = false;
  data: any [] = [];

  constructor(
    private staffService : StaffService,

  ) {
    this.identity = JSON.parse(localStorage.getItem('identity') || '{}');
    // console.log(this.identity)
    let roles: any[] = this.identity?.roleList;
  
      if ( roles != undefined ) {
        if ( roles.length > 0) {
        
          let isExist = roles.find( item => item.role == 'ROLE_ADMIN');
          if ( isExist != undefined ) {
            this.isAdmin = true;
          } else {
            this.isAdmin = false;
            this.selectedStaff(this.identity);
          }
        }
      }
  }

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
  //  let resp = await this.staffService.getStaffOrder();
  let resp = await this.staffService.getStaffByBusiness();
  //  console.log(resp, "resp");
    if ( resp !== undefined ) {
      this.data = resp?.data;
      this.data = this.data || [];
    } else {
     // this.notifySvc.showAlert(3, 'No results found', '');
      this.data = [];
    }
  }

  selectedStaff(item: any) {
    console.log('EDIT', item);
    this.showBtn = false;
    this.idStaff= item.id;
    this.itemStaff = item;    
    this.editStaff=true;
  }

  showScreenNewStaff() {
    this.editStaff = false;
    this.newStaff = true;
  }

  showModalPositionsCoach(e: boolean) {
    if ( !e ) {
      return
    }
    
    this.showModalOrder = true;
  }

  renderer() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
  });
  }

  ngOnDestroy(): void {
    this.renderer
    this.dtTrigger.unsubscribe();
  }
  

}
