import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { PromotionService } from 'src/app/@core/services/promotion.service';
import { AlertService } from 'src/app/@core/utils/alert.service';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss']
})
export class PromotionsComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  
  public formModal: any;
  public formModalDelete: any;

  public btns: any[] = [];
  public data: any[] = [];
  public promotion: any = false;
  public idSelected: number = 0;
  public currentDate2 = moment().format('YYYY-MM-DD');

  constructor(
    @Inject(DOCUMENT) private document: any,
    private promotionsSvc: PromotionService,
    private alertSvc: AlertService
  ) {
    this.btns.push({ name: 'Add new Promotion', icon: 'plus' });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      scrollX: true,
      autoWidth: false,
      destroy: true,
      responsive: true,
      dom: 'Bfrtip',
      lengthMenu: [5, 10, 25, 50, 75, 100]
    }
  }

  ngOnInit(): void {

    this.loadData();
    // this.formModal = new window.bootstrap.Modal(
    //   document.getElementById('modalNewPromotions')
    // );
    // this.formModalDelete = new window.bootstrap.Modal(
    //   document.getElementById('modalDeletePromotions')
    // );
  }

  /* Load Data */
  async loadData() {
    // this.spinnerSvc.show();
    let resp = await this.promotionsSvc.getData();
    
    if ( resp != undefined || resp != null ) {
      let { data } = resp;
      console.log(data)
      this.data = data || [];
    } else {
      this.alertSvc.showAlert(3, 'No results found', '');
      this.data = [];
    }
    this.dtTrigger.next(this.dtOptions);
    // this.spinnerSvc.hide();
  } 

  searchData(e: any) {
    let value = e.target.value;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.search(value).draw();
    });
  }

  /* Section Save */
  showModal(e: boolean) {
    if ( !e ) {
      return
    }

    this.formModal.show();
  }

  closeModal(band: boolean) {
    this.promotion = null;
    if ( band )
      this.formModal.hide();

    this.renderer();
    this.loadData();
  }

  /* Section Edit */
  async onEdit(item: any) {
    this.promotion = null;
    this.promotion = item;
    
  }

  
  /* Section Delete */
  openModalDelete(id: number) {
    this.idSelected = id;
    this.formModalDelete.show();
  }

  async onDelete(band: boolean) {
    if ( !band ) {
      this.formModalDelete.hide();
      return
    }

    let resp = await this.promotionsSvc.delete(this.idSelected);
    
    if ( resp != undefined || resp != null ) {
      let  { status } = resp;

      if ( status !== undefined && status === 200 ) {
        this.idSelected = 0
        this.formModalDelete.hide();
        this.alertSvc.showAlert(1, resp?.comment, 'Success')
        this.renderer();
        this.loadData();
      } else {
        this.alertSvc.showAlert(4, resp?.comment, 'Error');
      }  
    } else {
      this.alertSvc.showAlert(4, 'Error', 'Error');
    } 
  }

  /* Section Render & Destoy */
  renderer() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
  });
  }

  ngOnDestroy(): void {
    // this.renderer
    this.dtTrigger.unsubscribe();
  }

}
