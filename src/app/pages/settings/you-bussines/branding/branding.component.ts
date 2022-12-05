import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-branding',
  templateUrl: './branding.component.html',
  styleUrls: ['./branding.component.scss']
})
export class BrandingComponent implements OnInit {
  public showCustomer = false;
  public showInvoicePay = false;
  public showInvoicPdf = false;
  public showIdentity = false;


  constructor() { }

  ngOnInit(): void {
  }

}
