import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/@core/services/services.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bookfon-services',
  templateUrl: './bookfon-services.component.html',
  styleUrls: ['./bookfon-services.component.scss']
})
export class BookfonServicesComponent implements OnInit {
  loadingEvents:boolean=false;
  events: any = [];

  constructor(private service:ServicesService,private toast:ToastrService) { }

  async ngOnInit():Promise<any> {
    await this.loadScheduleBissnes();
  }

  async loadScheduleBissnes(){
    await this.service
    .getScheduleBussines()
    .then((res) => {
      this.events = res;
      this.loadingEvents = true;
    })
    .catch((err) => {
      this.loadingEvents = true;
      console.log(err);
      this.toast.error('Error while loading events', 'Error');
    });
  }

}
