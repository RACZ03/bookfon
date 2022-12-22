import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { dataTimeService } from 'src/app/@core/services/datatime.service';
import { TemporaryAvailabilityService } from 'src/app/@core/services/temporary-availability.service';
import { AlertService } from 'src/app/@core/utils/alert.service';

@Component({
  selector: 'app-lock-temporay-availability',
  templateUrl: './lock-temporay-availability.component.html',
  styleUrls: ['./lock-temporay-availability.component.scss']
})
export class LockTemporayAvailabilityComponent implements OnInit {

  @Input() idStaff: number = 0;
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  
  public dataHourInit: any[] = [];
  public dataMinuteInit: any[] = [];
  public dataAmPmInit: any[] = [];
  public dataHourfin: any[] = [];
  public dataMinutefin: any[] = [];
  public dataAmPmfin: any[] = [];
  public currentDate: string = moment().format('YYYY-MM-DD');
  public startDateInput: string = moment().format('YYYY-MM-DD');

  public temporaryAvailabilityForm!: FormGroup;
  public business: any = {};

  constructor(
    private fb: FormBuilder,
    private dataTimeSvr: dataTimeService,
    private alertSvc: AlertService,
    private temporaryAvailabilitySvc: TemporaryAvailabilityService
  ) { 
    this.business = JSON.parse(localStorage.getItem('businessSelected') || '{}');
  }

  ngOnInit(): void {
    this.temporaryAvailabilityForm = this.initForm();
    this.loadHourInit();
    this.loadHourFin();
    this.getFindById();
  }

  async getFindById() {
    let resp = await this.temporaryAvailabilitySvc.findById(this.idStaff);
    console.log(resp)
  }

  async onSubmit() {
    let hourInit = this.temporaryAvailabilityForm.get('hourInit')?.value;
    let minuteInit = this.temporaryAvailabilityForm.get('minuteInit')?.value;
    let amPmInit = this.temporaryAvailabilityForm.get('amPmInit')?.value;
    let hourFinish = this.temporaryAvailabilityForm.get('hourFinish')?.value;
    let minuteFinish = this.temporaryAvailabilityForm.get('minuteFinish')?.value;
    let amPmFinish = this.temporaryAvailabilityForm.get('amPmFinish')?.value;

    let startTime = moment(`${hourInit}:${minuteInit} ${amPmInit}`, 'hh:mm A').format('HH:mm:ss');
    let endTime = moment(`${hourFinish}:${minuteFinish} ${amPmFinish}`, 'hh:mm A').format('HH:mm:ss');

    let obj = {
      startDate: this.temporaryAvailabilityForm.get('startDate')?.value,
      endDate: this.temporaryAvailabilityForm.get('endDate')?.value,
      startTime: startTime,
      endTime: endTime,
      reason: this.temporaryAvailabilityForm.get('reason')?.value,
      textAlert: this.temporaryAvailabilityForm.get('textAlert')?.value,
      idStaff: this.idStaff,
      idBusiness: this.business.id
    };

    // console.log(obj);
    let resp = await this.temporaryAvailabilitySvc.save(obj);
    if ( resp !== undefined ) {
      let { status, message } = resp;
      if ( status == 200 || status == 201 ) {
        this.alertSvc.showAlert(1, 'Success', 'The temporary availability has been saved successfully.');
      } else {
        this.alertSvc.showAlert(4, 'Error', 'The temporary availability could not be saved.');
      }
      window.location.reload();
    } else {
      this.alertSvc.showAlert(4, 'Error', 'The temporary availability could not be saved.');
      window.location.reload();
    }
  }

  validateInputEnd() {
    // validate date end is greater than date start
    let startDate = this.temporaryAvailabilityForm.get('startDate')?.value;
    let endDate = this.temporaryAvailabilityForm.get('endDate')?.value;
    if (startDate > endDate) {
      this.alertSvc.showAlert(3, '', 'The start date cannot be greater than the end date.');
      this.temporaryAvailabilityForm.get('endDate')?.setValue('');
    }
  }

  validateHourEnd() {
    // validate hour end is greater than hour start
    let hourInit = this.temporaryAvailabilityForm.get('hourInit')?.value;
    let minuteInit = this.temporaryAvailabilityForm.get('minuteInit')?.value;
    let amPmInit = this.temporaryAvailabilityForm.get('amPmInit')?.value;
    let hourFinish = this.temporaryAvailabilityForm.get('hourFinish')?.value;
    let minuteFinish = this.temporaryAvailabilityForm.get('minuteFinish')?.value;
    let amPmFinish = this.temporaryAvailabilityForm.get('amPmFinish')?.value;

    let startTime = moment(`${hourInit}:${minuteInit} ${amPmInit}`, 'hh:mm A').format('HH:mm:ss');
    let endTime = moment(`${hourFinish}:${minuteFinish} ${amPmFinish}`, 'hh:mm A').format('HH:mm:ss');

    if (startTime > endTime) {
      this.alertSvc.showAlert(3, '', 'The start time cannot be greater than the end time.');
      this.temporaryAvailabilityForm.get('hourFinish')?.setValue('');
      this.temporaryAvailabilityForm.get('minuteFinish')?.setValue('');
      this.temporaryAvailabilityForm.get('amPmFinish')?.setValue('');
    }
  }

  async loadHourInit() {
    this.dataHourInit = [];
    this.dataHourInit = await this.dataTimeSvr.getHora();
    this.dataMinuteInit = [];
    this.dataMinuteInit = await this.dataTimeSvr.getMinutes();
    this.dataAmPmInit = [];
    this.dataAmPmInit = await this.dataTimeSvr.getAmPm();
  }

  async loadHourFin() {
    this.dataHourfin = [];
    this.dataHourfin = await this.dataTimeSvr.getHora();
    this.dataMinutefin = [];
    this.dataMinutefin = await this.dataTimeSvr.getMinutes();
    this.dataAmPmfin = [];
    this.dataAmPmfin = await this.dataTimeSvr.getAmPm();
  }

  validInput(name: string) {
    return (
      this.temporaryAvailabilityForm.get(name)?.touched &&
      this.temporaryAvailabilityForm.get(name)?.errors?.['required']
    );
  }

  initForm(): FormGroup {
    return this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      hourInit: ['', Validators.required],
      minuteInit: ['', Validators.required],
      amPmInit: ['', Validators.required],
      hourFinish: ['', Validators.required],
      minuteFinish: ['', Validators.required],
      amPmFinish: ['', Validators.required],
      reason: ['', Validators.required],
      alertText: ['', Validators.required],
    });

  }

  back() {
    window.location.reload();
  }

}
