import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service-product',
  templateUrl: './service-product.component.html',
  styleUrls: ['./service-product.component.scss']
})

export class ServiceProductComponent implements OnInit {

  //variables if 
  public showRetailProduct = false;
  public showRoomsEquipments = false;
  public showEventWorkshops = false;
  public showwaltlist = false;
  public showBookingServices = false;
  public showPickaSpot = false;


  constructor() { }

  ngOnInit(): void {
  }

}
