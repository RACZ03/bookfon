import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { dataTimeService } from 'src/app/@core/services/datatime.service';
import { TemporaryAvailabilityService } from 'src/app/@core/services/temporary-availability.service';
import { AlertService } from 'src/app/@core/utils/alert.service';

declare var window: any;

@Component({
  selector: 'app-lock-temporay-availability',
  templateUrl: './lock-temporay-availability.component.html',
  styleUrls: ['./lock-temporay-availability.component.scss']
})
export class LockTemporayAvailabilityComponent implements OnInit {


  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  
  public divNew: boolean = false;
  public idStaff: number = 0;
  

  public dataHourInit: any[] = [];
  public dataMinuteInit: any[] = [];
  public dataAmPmInit: any[] = [];
  public dataHourfin: any[] = [];
  public dataMinutefin: any[] = [];
  public dataAmPmfin: any[] = [];
  public currentDate: string = moment().format('YYYY-MM-DD');
  public startDateInput: string = moment().format('YYYY-MM-DD');
  public isEdit: boolean = false;

  public temporaryAvailabilityForm!: FormGroup;
  public business: any = {};

  public data: any[]  = [];
  public modalDelete: any;
  public idDelete: number = 0;

  constructor(
    private fb: FormBuilder,
    private dataTimeSvr: dataTimeService,
    private alertSvc: AlertService,
    private temporaryAvailabilitySvc: TemporaryAvailabilityService,
    private activeRouter: ActivatedRoute,
    private router: Router
  ) { 
    this.business = JSON.parse(localStorage.getItem('businessSelected') || '{}');
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
      search: false,
      info: false,
    }
  }

  ngOnInit(): void {
    this.temporaryAvailabilityForm = this.initForm();
    this.loadHourInit();
    this.loadHourFin();
    // get id by url
    this.activeRouter.params.subscribe( (params: any) => {
      this.idStaff = params.id;
      this.getFindById();
    });
    this.modalDelete = new window.bootstrap.Modal(
      document.getElementById('modalDeleteLockTemporaryAvailability')
    );
  }

  new() {
    this.divNew = true;
  }

  closeForm() {
    this.divNew = false;
    this.temporaryAvailabilityForm.reset();

    // reload data
    window.location.reload();
  }

  async getFindById() {
    let resp = await this.temporaryAvailabilitySvc.getAllByBusiness();
    if ( resp !== undefined ) {
      let { status, message } = resp;
      if ( status == 200 || status == 201 ) {
        let { data } = resp;
        if ( data.length > 0 ) {
          // filter by idStaff
          data = data.filter( (item: any) => item.idStaff == this.idStaff );
          this.data = data;
        }
      }
    }
    if ( this.dtElement !== undefined ) 
      this.dtTrigger.next(this.dtOptions);
  }

  async onEdit(item: any) {
    // console.log(item)
    let resp = await this.temporaryAvailabilitySvc.findById(item.id);
    if ( resp !== undefined ) {
      // console.log(resp);
      let { status, message } = resp;
      if ( status == 200 || status == 201 ) {
        let { data } = resp;
        let startTimeConvet12 = moment(data.startTime, 'HH:mm:ss').format('hh:mm');
        let endTimeConvet12 = moment(data.endTime, 'HH:mm:ss').format('hh:mm');
        this.temporaryAvailabilityForm.patchValue({
          id: data.id,
          startDate: data.startDate,
          endDate: data.endDate,
          hourInit: startTimeConvet12.split(':')[0],
          minuteInit: startTimeConvet12.split(':')[1],
          amPmInit: moment(data.startTime, 'HH:mm:ss').format('A'),
          hourFinish: endTimeConvet12.split(':')[0],
          minuteFinish: endTimeConvet12.split(':')[1],
          amPmFinish: moment(data.endTime, 'HH:mm:ss').format('A'),
          reason: data.reason,
          alertText: data.alertText
        });
        // console.log(this.temporaryAvailabilityForm.value)
        this.divNew = true;
        this.isEdit = true;
      }
    }
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
      id: this.temporaryAvailabilityForm.get('id')?.value,
      startDate: this.temporaryAvailabilityForm.get('startDate')?.value,
      endDate: this.temporaryAvailabilityForm.get('endDate')?.value,
      startTime: startTime,
      endTime: endTime,
      reason: this.temporaryAvailabilityForm.get('reason')?.value,
      alertText: this.temporaryAvailabilityForm.get('alertText')?.value,
      idStaff: this.idStaff,
      idBusiness: this.business.id
    };

    // console.log(obj);
    let resp = await this.temporaryAvailabilitySvc.save(obj, this.isEdit);
    if ( resp !== undefined ) {
      let { status, message } = resp;
      if ( status == 200 || status == 201 ) {
        this.alertSvc.showAlert(1, 'Success', 'The temporary availability has been saved successfully.');
      } else {
        this.alertSvc.showAlert(4, 'Error', 'The temporary availability could not be saved.');
      }
      this.divNew = false;
      this.getFindById();
    } else {
      this.alertSvc.showAlert(4, 'Error', 'The temporary availability could not be saved.');
      this.divNew = false;
      this.getFindById();
    }
  }

  // delete
  onDelete(item: any) {
    this.idDelete = item.id;
    this.modalDelete.show();
  }

  async confirmDeleteRecord(e: any) {
    if ( !e ) {
      this.modalDelete.hide();
      return;
    }

    let resp = await this.temporaryAvailabilitySvc.delete(this.idDelete);
    if ( resp !== undefined ) {
      let { status, message } = resp;
      this.modalDelete.hide();
      if ( status == 200 || status == 201 ) {
        this.alertSvc.showAlert(1, 'Success', 'The temporary availability has been deleted successfully.');
      } else {
        this.alertSvc.showAlert(4, 'Error', 'The temporary availability could not be deleted.');
      }
      
      window.location.reload();
    } else {
      this.alertSvc.showAlert(4, 'Error', 'The temporary availability could not be deleted.');
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
      id: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      hourInit: ['', Validators.required],
      minuteInit: ['', Validators.required],
      amPmInit: ['', Validators.required],
      hourFinish: ['', Validators.required],
      minuteFinish: ['', Validators.required],
      amPmFinish: ['', Validators.required],
      reason: ['', Validators.required],
      alertText: [''],
    });

  }

  back() {
    this.router.navigate(['/pages/staff']);
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
