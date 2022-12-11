import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { PromotionService } from 'src/app/@core/services/promotion.service';
import { ServicesService } from 'src/app/@core/services/services.service';
import { AlertService } from 'src/app/@core/utils/alert.service';

@Component({
  selector: 'app-add-promotion',
  templateUrl: './add-promotion.component.html',
  styleUrls: ['./add-promotion.component.scss']
})
export class AddPromotionComponent implements OnInit {

  @Output() onClose = new EventEmitter<boolean>();
  
  @Input() dataPromotion: any[] = [];
  @Input() set dataUpdate(value: any) {
    this.loadDataForm(value);
  }

  promotionForm!: FormGroup;

  public title: string = 'New Promotion';
  public selectIndex: number = 1;
  public dataLessons: any[] = [];
  public lessonsPurcharsed: any[] = [];
  public prometedLessons: any[] = [];

  public currentDate = moment().format('YYYY-MM-DD');

  public minEndDate = moment().format('YYYY-MM-DD');

  constructor(
    private readonly fb: FormBuilder,
    private promotionSvc: PromotionService,
    private ServicesSvc: ServicesService,
    private alertSvc: AlertService,
  ) { 
    
  }

  ngOnInit(): void {
    this.promotionForm = this.initForms();
    this.loadLessons();
    this.loadDataForm();
  }

  async loadLessons() {
    this.dataLessons = [];
    let resp = await this.ServicesSvc.getServicesByBusinesset();
    
    if ( resp != null || resp != undefined ) {
      let { data } = resp;
      this.dataLessons = data || [];
    } else {
      this.dataLessons = [];
    }
  }  

  async onSubmit() {
    if ( this.promotionForm.invalid ) 
      return
    
    let data = this.promotionForm.value;

    if ( this.lessonsPurcharsed.length == 0 ) {
      this.alertSvc.showAlert(2, 'Please add at least one lesson purchased', 'warning');
      return;
    }
    if ( this.prometedLessons.length == 0 ) {
      this.alertSvc.showAlert(2, 'You must select at least one lesson', 'Warning');
      return;
    }

    data.lessonsPurcharsed = this.lessonsPurcharsed;
    data.prometedLessons = this.prometedLessons;

    // Send Data
    let resp = await this.promotionSvc.save(data);

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
    if ( this.promotionForm == undefined )
      return;

    if ( data?.length == 0 || data == null || data == undefined)
      return;

    this.title = ( data == null || data == undefined ) ? 'New Promotion' : 'Update Promotion';

    this.promotionForm.reset({
      id: (data == null) ? 0 : data?.id,
      description: (data == null ) ? '' : data?.description,
      count: (data == null ) ? 0 : data?.quantity,
      startDate: (data == null ) ? '' : moment( data?.dateFrom).format('YYYY-MM-DD'),
      endDate: (data == null ) ? '' : moment(data?.dateTo).format('YYYY-MM-DD'),
      applyWallet: (data == null ) ? false : data?.applyWallet,
      daysValidityCoupon: (data == null ) ? 0 : data?.couponValidityDays,
    });
    if ( data?.promocionHasta == null ) {
      this.promotionForm.controls['endDate'].enable();
    }

    this.lessonsPurcharsed = [];
    let dataLessonP = (data == null) ? [] : data?.servicesPurchaseList;
    if ( dataLessonP.length > 0 ) {
      dataLessonP.forEach( (item: any) => {
        this.lessonsPurcharsed.push(item?.clase);
      });
    }

    this.prometedLessons = [];
    let dataLessonP2 = (data == null) ? [] : data?.servicesGiftList;
    if ( dataLessonP2.length > 0 ) {
      dataLessonP2.forEach( (item: any) => {
        this.prometedLessons.push(item?.clase);
      });
    }
  }

  setValueStartDate() {
    this.promotionForm.controls['endDate'].enable();
    let min = this.promotionForm.get('startDate')?.value;
    this.minEndDate = moment(min).add(1, 'd').format('YYYY-MM-DD');
  }

  addLessonsPurcharsed() {
    let idItem = this.promotionForm.get('lessonPurcharsedId')?.value;

    let found = this.dataLessons.find( x => x.id === idItem);

    let foundSelected = this.lessonsPurcharsed.find( x => x.id === found.id );

    if ( foundSelected !== undefined ) {
      this.alertSvc.showAlert(2, 'This lesson is already added', 'warning');
      return;
    }
    this.lessonsPurcharsed.push(found);
    this.promotionForm.get('lessonPurcharsedId')?.setValue('');
  }

  addPrometedLessons() {
    let idItem = this.promotionForm.get('prometedLessonsdId')?.value;

    let found = this.dataLessons.find( x => x.id === idItem);

    let foundSelected = this.prometedLessons.find( x => x.id === found.id );

    if ( foundSelected !== undefined ) {
      this.alertSvc.showAlert(2, 'This lesson is already added', 'warning');
      return;
    }
    this.prometedLessons.push(found);
    
    this.promotionForm.get('prometedLessonsdId')?.setValue('');
  }

  removeRow(id: number, type: number) {
    if ( type === 1 ) {
      this.lessonsPurcharsed = this.lessonsPurcharsed.filter( (item: any) => item.id != id );
    } else {
      this.prometedLessons = this.prometedLessons.filter( (item: any) => item.id != id );
    }
  }

  validInput(name: string) {
    return this.promotionForm.get(name)?.touched && this.promotionForm.get(name)?.errors?.['required'];
  }

  validateInputLength(name: string) {
    return this.promotionForm.get(name)?.touched && this.promotionForm.get(name)?.errors?.['minlength'];
  }

  initForms(): FormGroup {
    return this.fb.group({
      id: [''],
      description: ['', [Validators.required] ],
      startDate: ['', [Validators.required] ],
      endDate: [{ value : '', disabled: true}, [Validators.required] ],
      count: [0, [Validators.required]],
      applyWallet: [false],
      daysValidityCoupon: [0, [Validators.required]],
      lessonPurcharsedId: [''],
      prometedLessonsdId: ['']
    })
  }

  back() {
    this.onClose.emit(true);
  }

}
