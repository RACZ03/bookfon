import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ServicesService } from 'src/app/@core/services/services.service';

@Component({
  selector: 'app-all-service',
  templateUrl: './all-service.component.html',
  styleUrls: ['./all-service.component.scss']
})
export class AllServiceComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  public data: any[] = [];


  constructor(
    private serviceSvr : ServicesService,
    public router: Router,

  ) { 
   // this.permissions = this.permissionsSvc.getPermissions('services');
    this.dtOptions = {
      // pagingType: 'full_numbers',
      pagingType: "simple_numbers",
      pageLength: 5,
      scrollX: true,
      autoWidth: false,
      destroy: true,
      responsive: true,
      dom: 'Bfrtip',
      searching: true,
      info: false,
  }
}

  ngOnInit(): void {
    this.loadData();
  }

  searchData(e: any) {
    let value = e.target.value;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.search(value).draw();
    });
  }

  async loadData() {
    this.data = [];
    let resp = await this.serviceSvr.getServicesByBusinesset();
      this.data = resp.data;
    //  console.log(this.data);
      // this.dtTrigger.next(this.dtOptions);

  }

  editService(id: any){
    this.router.navigate([`/pages/services/updateServices/${id}`]);
  }

}
