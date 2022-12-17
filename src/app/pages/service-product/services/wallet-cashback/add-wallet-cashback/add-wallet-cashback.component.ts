import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { WalletCashbackService } from 'src/app/@core/services/wallet-cashback.service';
import { AlertService } from 'src/app/@core/utils/alert.service';

@Component({
  selector: 'app-add-wallet-cashback',
  templateUrl: './add-wallet-cashback.component.html',
  styleUrls: ['./add-wallet-cashback.component.scss']
})
export class AddWalletCashbackComponent implements OnInit {

  @Output() onClose = new EventEmitter<boolean>();
  
  @Input() dataPromotion: any[] = [];
  @Input() set dataUpdate(value: any) {
    console.log('dataUpdate', value)
    if ( this.walletCashBackForm == undefined )
      this.walletCashBackForm = this.initForms();


    this.loadDataForm(value);
  }

  walletCashBackForm!: FormGroup;

  public title: string = 'New Wallet Promotion';
  public selectIndex: number = 1;
  public dataLessons: any[] = [];
  public lessonsPurcharsed: any[] = [];
  public prometedLessons: any[] = [];
  public idBusiness: number = 0;

  public currentDate = moment().format('YYYY-MM-DD');

  public minEndDate = moment().format('YYYY-MM-DD');

  constructor(
    private readonly fb: FormBuilder,
    private walletCashBackSvc: WalletCashbackService,
    private alertSvc: AlertService,
  ) { 
    let businessSelected = JSON.parse(localStorage.getItem('businessSelected') || '{}');
    this.idBusiness = businessSelected?.id;
  }

  ngOnInit(): void {
    if ( this.walletCashBackForm == undefined)
      this.walletCashBackForm = this.initForms();
    // this.loadDataForm();
  }

  async onSubmit() {
    if ( this.walletCashBackForm.invalid ) 
      return
    
    let data = this.walletCashBackForm.value;

    // Send Data
    let resp = await this.walletCashBackSvc.save(data);

    if ( resp != null || resp != undefined ) {
      let { status } = resp;
      if ( status == 200 ) {
        this.alertSvc.showAlert(1, resp?.comment, 'Success')
        // this.loadDataForm();
        this.onClose.emit(true);
      } else {
        this.alertSvc.showAlert(4, resp?.comment, 'Error')
      }
    } else {
      this.alertSvc.showAlert(4, 'Error', 'Error')
    }
  }

  loadDataForm(data: any = null) {

    if ( data?.length == 0 || data == null || data == undefined)
      return;

    this.title = ( data == null || data == undefined ) ? 'New Wallet Promotion' : 'Update Wallet Promotion';

    this.walletCashBackForm.reset({
      id: (data == null) ? 0 : data?.id,
      idBusiness: (data == null) ? 0 : data?.idBusiness,
      description: (data == null ) ? '' : data?.description,
      startDate: (data == null ) ? '' : moment( data?.startDate).format('YYYY-MM-DD'),
      endDate: (data == null ) ? '' : moment(data?.endDate).format('YYYY-MM-DD'),
      amount: (data == null ) ? 0 : data?.amount,
      promotionAmount: (data == null ) ? 0 : data?.promotionAmount,
    });

    if ( data != null || data != undefined ) {
      // enable endDate
      this.walletCashBackForm.controls['endDate'].enable();
    }
    // console.log('end')
  }

  setValueStartDate() {
    this.walletCashBackForm.controls['endDate'].enable();
    let min = this.walletCashBackForm.get('startDate')?.value;
    this.minEndDate = moment(min).add(1, 'd').format('YYYY-MM-DD');
  }

  validInput(name: string) {
    return this.walletCashBackForm.get(name)?.touched && this.walletCashBackForm.get(name)?.errors?.['required'];
  }

  validateInputLength(name: string) {
    return this.walletCashBackForm.get(name)?.touched && this.walletCashBackForm.get(name)?.errors?.['minlength'];
  }

  initForms(): FormGroup {
    return this.fb.group({
      id: [0],
      idBusiness: [this.idBusiness],
      description: ['', [Validators.required] ],
      startDate: ['', [Validators.required] ],
      endDate: [{ value : '', disabled: true}, [Validators.required] ],
      amount: [0, [Validators.required]],
      promotionAmount: [0, [Validators.required]],
    })
  }

  back() {
    this.onClose.emit(true);
  }

}
