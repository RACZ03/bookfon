import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionsService } from 'src/app/@core/services/transactions.service';
import { AlertService } from 'src/app/@core/utils/alert.service';

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.scss']
})
export class RechargeComponent implements OnInit {

  public identity: any = {};
  public businessSelected: any = {};
  public customer: any = {};

  @Input() set setCustomer( value: any) {
    if( value == 0 ) return;

    // console.log('jso')
    this.customer = value;
    if ( this.customer !== undefined ) {
      // console.log(this.customer)
      if ( this.customer?.idWallet !== undefined ) {
        this.rechargeForm.patchValue({
          idWallet: this.customer?.idWallet,
          // clearn incomeAmount
          incomeAmount: '',
          promotionAmount: '',
        });
      } else {
        this.rechargeForm.patchValue({
          idBusiness: this.businessSelected?.id,
          idCustomer: (this.customer?.idCustomer !== undefined) ? this.customer?.idCustomer : 0,
          // clearn incomeAmount
          incomeAmount: '',
          promotionAmount: '',
        })
      }
    }
  }
  @Output() rechargeEnd: EventEmitter<boolean> = new EventEmitter<boolean>();

  rechargeForm!: FormGroup;
  public title: string = 'Wallet Top-up';

  constructor(
    private readonly fb: FormBuilder,
    private transactionSvc: TransactionsService,
    private alertSvc: AlertService
  ) { 
    this.identity = JSON.parse(localStorage.getItem('identity') || '{}');
    this.businessSelected = JSON.parse(localStorage.getItem('businessSelected') || '{}');
  }

  ngOnInit(): void {
    this.rechargeForm = this.initForms();
  }

  async onSubmit() {

    // Validate incomeAmount no empty
    if ( this.rechargeForm.get('incomeAmount')?.value == '' ) {
      this.alertSvc.showAlert(3, '', 'The amount is required');
      return;
    } 

    // verify input promotionAmoint is null add 0
    if ( this.rechargeForm.get('promotionAmount')?.value == '' ) {
      this.rechargeForm.patchValue({
        promotionAmount: 0
      })
    }
    // console.log(this.rechargeForm.value);
    let resp = await this.transactionSvc.rechargeWallet(this.rechargeForm.value);
    if ( resp?.status == 200 ) {
      this.alertSvc.showAlert(1, 'Success', 'Wallet recharged successfully');
      this.rechargeEnd.emit(true);
    } else if ( resp?.status == 4 ) {
      this.alertSvc.showAlert(2, 'Warnign', 'Wallet not found');

    } else {
      this.alertSvc.showAlert(4, 'Error', 'Error recharge wallet');
    }
  }

  validInput(name: string) {
    return this.rechargeForm.get(name)?.touched && this.rechargeForm.get(name)?.errors?.['required'];
  }
  
  initForms(): FormGroup {
    return this.fb.group({
      idWallet: [ '', Validators.required], 
      idBusiness: [ '', Validators.required], 
      idCustomer: [ '', Validators.required], 
      type: [1], 
      incomeAmount: ['', Validators.required], 
      promotionAmount: [''], 
      date: [ new Date(), Validators.required],
      idAdminRecharge: [ this.identity?.id , Validators.required],
    })
  }
}
