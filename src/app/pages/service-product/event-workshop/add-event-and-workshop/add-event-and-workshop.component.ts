import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { CatalogService } from 'src/app/@core/services/catalogs.service';
import { EventWorkshopService } from 'src/app/@core/services/event-workshop.service';
import { StaffService } from 'src/app/@core/services/staff.service';
import { AlertService } from 'src/app/@core/utils/alert.service';

declare var window: any;

@Component({
  selector: 'app-add-event-and-workshop',
  templateUrl: './add-event-and-workshop.component.html',
  styleUrls: ['./add-event-and-workshop.component.scss']
})
export class AddEventAndWorkshopComponent implements OnInit {

  public module: any = false;
  public title: string = '';
  public currencies: any[] = [];
  public categoryData: any[] = [];
  public staffData: any[] = [];
  public sessionListDeleted: any[] = [];
  public formModalCategorie: any;
  eventForm!: FormGroup;
  public urlImage: string = '';

  public daysList: any[] = [];

  public btnSession: boolean = true;
  public businessSelected: any = {};
  public isEdit: boolean = false;

  constructor(
    private fb: FormBuilder,
    private catalogSvc: CatalogService,
    private eventWorkshopSvc: EventWorkshopService,
    private staffSvc: StaffService,
    private alertSvc: AlertService,
    private router: Router,
    private ActivatedRoute: ActivatedRoute
  ) { 

    this.businessSelected = JSON.parse(localStorage.getItem('businessSelected') || '{}');

    this.daysList = [
      {
        id: 0,
        day: 'Monday',
        active: false,
      },
      {
        id: 1,
        day: 'Tuesday',
        active: false,
      },
      {
        id: 2,
        day: 'Wednesday',
        active: false,
      },
      {
        id: 3,
        day: 'Thursday',
        active: false,
      },
      {
        id: 4,
        day: 'Friday',
        active: false,
      },
      {
        id: 5,
        day: 'Saturday',
        active: false,
      },
      {
        id: 6,
        day: 'Sunday',
        active: false,
      },
    ];
  }

  ngOnInit(): void {
    this.formModalCategorie = new window.bootstrap.Modal(
      document.getElementById('modalAddMoreWorkshopCategory')
    );

    this.eventForm = this.initForm();

    this.getCurrencies();
    this.loadDataCategories();
    this.loadStaffList();

    // get id from url
    this.ActivatedRoute.params.subscribe((params) => {
      let { id } = params;
      if (id !== undefined) {
        this.module = true;
        // this.title = 'Edit event';
        this.getEventById(id);
      } else {
        this.module = false;
        // this.title = 'Add event';
      }
    });
  }

  clickedFile() {
    // click input file
    let file = document.getElementById('fileService') as HTMLInputElement;
    file.click();
  }

  async SelectedFile(event: any) {
    // set image and upload
    let file = event.target.files[0];
    let reader = new FileReader();
    // Upload image to firebase
    let resp = await this.eventWorkshopSvc.uploadImage(file);
    if (resp != undefined || resp != null) {
      this.urlImage = resp;
      // set urlImage from form
      this.eventForm.get('urlImage')?.setValue(this.urlImage);
    }
  }

  async getCurrencies() {
    this.currencies = [];
    let resp = await this.catalogSvc.getCurrencies();
    if (resp != undefined || resp != null) {
      let { data } = resp;
      if (data !== undefined) {
        this.currencies = data || [];
      }
    }
  }

  async loadDataCategories() {
    this.categoryData = [];
    let resp = await this.eventWorkshopSvc.getDataCategory();

    if (resp != undefined || resp != null) {
      if (resp.status === 404) {
        this.alertSvc.showAlert(4, resp.statusText, 'Error');
      } else {
        let { data } = resp;
        if (data !== undefined) {
          this.categoryData = data || [];
        }
      }
    } else {
      this.alertSvc.showAlert(3, 'No results found', '');
    }
  }

  async loadStaffList() {
    this.staffData = [];
    
    let resp = await this.staffSvc.getStaffOrder();

    if (resp != undefined || resp != null) {
      if (resp.status === 404) {
        this.alertSvc.showAlert(4, '', 'Error');
      } else {
        let { data } = resp;
        if (data !== undefined) {
          // add property full name
          data.forEach((item: any) => { item.fullName = `${item.firstName} ${item.lastName}`; });
          this.staffData = data || [];
        }
      }
    } else {
      this.alertSvc.showAlert(3, 'No results found', '');
    }
    this.staffData.unshift({ fullName: 'Staff member', id: null });
  }

  async getEventById(id: number) {
    let resp = await this.eventWorkshopSvc.getEventById(id);
    if (resp != undefined || resp != null) {
      if (resp.status === 404) {
        this.router.navigate(['/pages/services/add-event-workshop']);
      } else {
        let { data } = resp;
        if (data !== undefined) {
          let { workshopDetails } = data;
          if (workshopDetails == null || workshopDetails == undefined) {
            this.router.navigate(['/pages/services/add-event-workshop']);
          }
          if ( workshopDetails.type == null ) {
            this.btnSession = true;
          } else {
            this.btnSession = ( workshopDetails.type == 1 ) ? true : false;
          }
          this.isEdit = true;
          if ( this.btnSession ) {
            this.loadFormSession(workshopDetails);
          } else {
            this.loadFormConsecutive(workshopDetails);
          }
        }
      }
    } else {
      this.router.navigate(['/pages/services/add-event-workshop']);
    }
  }

  loadFormSession(data: any) {
    // load data form sessions
    this.eventForm.get('id')?.setValue(data?.id);
    this.eventForm.get('idBusiness')?.setValue(data?.business?.id);
    this.eventForm.get('idCategory')?.setValue(data?.category?.id);

    this.eventForm.get('idCurrency')?.setValue(data?.currency?.id);
    this.eventForm.get('name')?.setValue(data?.name);
    this.eventForm.get('description')?.setValue(data?.description);
    this.eventForm.get('urlImage')?.setValue(data?.urlImage);
    this.urlImage = data?.urlImage;
    this.eventForm.get('type')?.setValue(data?.type);  

    // disable buttons sessions
    let btnSession = document.getElementById('btnConsecutiveID') as HTMLInputElement;
    btnSession.disabled = true;

    this.eventForm.get('totalCapacity')?.setValue(data?.totalCapacity);
    this.eventForm.get('manyCanWaitList')?.setValue(data?.manyCanWaitList);
    this.eventForm.get('pricePackage')?.setValue(data?.pricePackage);
    let { cancellationPolicy } = data;

    if (cancellationPolicy != null || cancellationPolicy != undefined) {
      let { hoursBefore, cancellationFee, cancellationAccept, cancellationCharge } = cancellationPolicy || {};
      this.eventForm.get('cancellationPolicy.hoursBefore')?.setValue(hoursBefore);
      this.eventForm.get('cancellationPolicy.cancellationFee')?.setValue(cancellationFee);
      this.eventForm.get('cancellationPolicy.cancellationAccept')?.setValue((cancellationAccept == "true") ? true : false);
      this.eventForm.get('cancellationPolicy.cancellationCharge')?.setValue((cancellationCharge == "true") ? true : false);
      this.eventForm.get('cancellationPolicy.idCurrency')?.setValue(data.currency.id);
      // checked radio cancellation Accept
      let radioAccept, radioCharge;
      if ( cancellationAccept == true || cancellationAccept == "true" ) {
        radioAccept = document.getElementById('radioCancellationAcceptTrue'); 
      } else {
        radioAccept = document.getElementById('radioCancellationAcceptFalse');
      }
      if ( cancellationCharge == true || cancellationCharge == "true" ) {
        radioCharge = document.getElementById('radioCancellationChargeTrue');
      } else {
        radioCharge = document.getElementById('radioCancellationChargeFalse');
      }
      radioCharge?.click();
      radioAccept?.click();
    }

    let { workshopSession } = data;
    if ( workshopSession != null || workshopSession != undefined ) {
      // reset form array sessions
      this.sessions.clear();
      for (let i = 0; i < workshopSession.length; i++) {
        let obj = {
          id: workshopSession[i]?.id,
          sessionName: workshopSession[i]?.name,
          // salesChannels: ['', [ Validators.required ]],
          idCurrency: data.currency.id,
          idStaff: workshopSession[i]?.idStaff,
          maskStaff: workshopSession[i]?.maskStaff || false,
          sessionPrice: workshopSession[i]?.sessionPrice,
          date: workshopSession[i]?.date,
          startTime: workshopSession[i]?.startTime,
          endTime:  workshopSession[i]?.endTime,
          description: workshopSession[i]?.description,
        };
        // set value to form array sessions into eventForm
        this.sessions.push(this.fb.group(obj));

        // check radio button mask staff
        setTimeout(() => {
          let radio;
          if ( obj.maskStaff ) {
            radio = document.getElementById('maskStaffSessionTrue_' + i);
          } else {
            radio = document.getElementById('maskStaffSessionFalse_' + i);
          }
          radio?.click();
        }, 200);
        
      }
      
    }

  }

  loadFormConsecutive(data: any) {

    // disable buttons sessions
    let btnSession = document.getElementById('btnSessionID') as HTMLInputElement;
    btnSession.disabled = true;

    this.eventForm.get('id')?.setValue(data?.id);
    this.eventForm.get('idBusiness')?.setValue(data?.business?.id);
    this.eventForm.get('idCategory')?.setValue(data?.category?.id);

    this.eventForm.get('idCurrency')?.setValue(data?.currency?.id);
    this.eventForm.get('name')?.setValue(data?.name);
    this.eventForm.get('description')?.setValue(data?.description);
    this.eventForm.get('urlImage')?.setValue(data?.urlImage);
    this.urlImage = data?.urlImage;
    this.eventForm.get('type')?.setValue(data?.type);  
    this.eventForm.get('totalCapacity')?.setValue(data?.totalCapacity);
    this.eventForm.get('manyCanWaitList')?.setValue(data?.manyCanWaitList);
    this.eventForm.get('startDate')?.setValue(data?.startDate);
    this.eventForm.get('endDate')?.setValue(data?.endDate);
    this.eventForm.get('startTime')?.setValue(data?.startTime);
    this.eventForm.get('endTime')?.setValue(data?.endTime);
    this.eventForm.get('price')?.setValue(data?.price);

    let { cancellationPolicy } = data;

    if (cancellationPolicy != null || cancellationPolicy != undefined) {
      let { hoursBefore, cancellationFee, cancellationAccept, cancellationCharge } = cancellationPolicy || {};
      this.eventForm.get('cancellationPolicy.hoursBefore')?.setValue(hoursBefore);
      this.eventForm.get('cancellationPolicy.cancellationFee')?.setValue(cancellationFee);
      this.eventForm.get('cancellationPolicy.cancellationAccept')?.setValue((cancellationAccept == "true") ? true : false);
      this.eventForm.get('cancellationPolicy.cancellationCharge')?.setValue((cancellationCharge == "true") ? true : false);
      this.eventForm.get('cancellationPolicy.idCurrency')?.setValue(data.currency.id);
      // checked radio cancellation Accept
      let radioAccept, radioCharge;
      if ( cancellationAccept == true || cancellationAccept == "true" ) {
        radioAccept = document.getElementById('radioCancellationAcceptTrue'); 
      } else {
        radioAccept = document.getElementById('radioCancellationAcceptFalse');
      }
      if ( cancellationCharge == true || cancellationCharge == "true" ) {
        radioCharge = document.getElementById('radioCancellationChargeTrue');
      } else {
        radioCharge = document.getElementById('radioCancellationChargeFalse');
      }
      radioCharge?.click();
      radioAccept?.click();
    }

    let { schedule } = data;
    if ( schedule != null || schedule != undefined ) {
      // reset form array schedule
      this.schedule.clear();
      for (let i = 0; i < this.daysList.length; i++) {
        let find = schedule.find( (e: any) => e.day == this.daysList[i].id );
        if ( find != undefined ) {
          this.daysList[i].active = true;
          // set value to form array sessions into eventForm
          let obj = {
            day: this.daysList[i].id,
            startTime: find?.startTime,
            endTime: find?.endTime,
          }
          this.schedule.push(this.fb.group(obj));
        }
      }
    }

    setTimeout(() => {
      if ( data?.staff?.id != null ) {
        this.eventForm.get('idStaff')?.setValue(data?.staff?.id);
      } else {
        // selected first options in select staff
        let staff = document.getElementById('staffSelectFirst');
        // first option
        staff?.children[0].setAttribute('selected', 'selected');
      }
    }, 200);
  }

  verifyAmount() {
    // verify how many can wailist no more than total capacity
    let totalCapacity = this.eventForm.get('totalCapacity')?.value;
    let waitlist = this.eventForm.get('manyCanWaitList')?.value;

    if ( parseInt(waitlist) >= parseInt(totalCapacity) ) {
      this.eventForm.get('manyCanWaitList')?.setValue('');
      this.alertSvc.showAlert(4, 'The waitlist capacity must be less than the total capacity', 'Error');
    }
  }

  showModalCategoriesAdd(e: boolean) {
    if (!e) {
      return;
    }
    this.formModalCategorie.show();
    this.loadDataCategories();
  }

  closeModalCategories(band: boolean) {
    if (band) this.formModalCategorie.hide();
    this.loadDataCategories();
  }

  addMoreSessions() {
    // add new session form array
    this.sessions.push(this.fb.group({
      idCurrency: [''],
      sessionName: ['', [ Validators.required ]],
      // salesChannels: ['', [ Validators.required ]],
      idStaff: ['', [ Validators.required ]],
      maskStaff: ['', [ Validators.required ]],
      sessionPrice: ['', [ Validators.required ]],
      date: ['', [ Validators.required ]],
      startTime: ['', [ Validators.required ]],
      endTime: ['', [ Validators.required ]],
      description: [''],
    }));
  }

  removeItemSessions(index: number) { 
    // remove session form array
    this.sessionListDeleted.push( { ...this.sessions.value[index], pasive: true } );
    this.sessions.removeAt(index);
  }

  activeOptionDays(i: any) {
    this.daysList[i].active = !this.daysList[i].active;

    // valida if desactive days
    if ( this.daysList[i].active == false ) {
      // delete elements from array schedule
      this.schedule.value.forEach( (e: any, index: number) => {
        if ( e.day == this.daysList[i].day ) {
          this.schedule.removeAt(index);
        }
      });
    }
  }

  validateEndTime() {
    let startTime = this.eventForm.get('startTime')?.value;
    let endTime = this.eventForm.get('endTime')?.value;
    if ( startTime > endTime ) {
      this.eventForm.get('endTime')?.setValue('');
      this.alertSvc.showAlert(4, 'The end time must be greater than the start time', 'Error');
    }
  }

  async onSubmit() {
    // Validate urlImage not empty
    let urlImage = this.eventForm.get('urlImage')?.value;
    if ( urlImage === '' || urlImage === undefined || urlImage === null ) {
      this.alertSvc.showAlert(4,  'Error', 'The image is required');
      return;
    }

    // validate idCurrency not empty
    let idCurrency = this.eventForm.get('idCurrency')?.value;
    if ( idCurrency === '' || idCurrency === undefined || idCurrency === null ) {
      this.alertSvc.showAlert(4,  'Error', 'The currency is required');
      return;
    }

    let type = this.eventForm.get('type')?.value;
    let resp;
    // IF TYPE IS 1: save session
    if (type === 1) {
      // validate session delete list is not empty
      if ( this.sessionListDeleted.length > 0 ) {
        // add session deleted to form session list
        this.sessions.value.push(...this.sessionListDeleted);
      }

      resp = await this.eventWorkshopSvc.saveSession(this.eventForm.value, this.isEdit);
    } else {
      // VALIDATE startTime and endTime
      let startTime = this.eventForm.get('startTime')?.value;
      let endTime = this.eventForm.get('endTime')?.value;
      if ( startTime === '' || startTime === undefined || startTime === null ) {
        this.alertSvc.showAlert(4,  'Error', 'The start time is required');
        return;
      }
      if ( endTime === '' || endTime === undefined || endTime === null ) {
        this.alertSvc.showAlert(4,  'Error', 'The end time is required');
        return;
      }
      // set value schedule
      let days = this.daysList.filter((item: any) => item.active === true) || [];

      if ( days.length === 0 ) {
        this.alertSvc.showAlert(4, 'Error', 'The days are required');
        return;
      }
      
      // set value days
      for (let i = 0; i < days.length; i++) {
        // construct object days
        let startTime = this.eventForm.get('startTime')?.value;
        let endTime = this.eventForm.get('endTime')?.value;
        let day = {
          day: days[i].id,
          startTime: moment(startTime, 'HH:mm').format('HH:mm:ss'),
          endTime: moment(endTime, 'HH:mm').format('HH:mm:ss')
        };
        this.eventForm.get('schedule')?.value.push(day);
      }

      // filter days repeated
      let daysFilter = this.eventForm.get('schedule')?.value.filter((item: any, index: number, self: any) => {
        return index === self.findIndex((t: any) => {
          return t.day === item.day;
        });
      });

      // set value days filter
      this.eventForm.get('schedule')?.setValue(daysFilter);

      resp = await this.eventWorkshopSvc.saveConsecutive(this.eventForm.value, this.isEdit);
    }

    if (resp != undefined || resp != null) {
      if (resp.status === 404) {
        this.alertSvc.showAlert(4, '', 'Error');
      } else {
        this.alertSvc.showAlert(1, 'Success', resp?.comment);
        this.router.navigate(['/pages/services']);
      }
    } else {
      this.alertSvc.showAlert(3, '', 'Registration not done');
    }

  }

  changeType(type: number) {
    this.btnSession = !this.btnSession;

    // set idType
    this.eventForm.get('type')?.setValue((this.btnSession) ? 1 : 2);
  }

  get sessions() {
    return this.eventForm.get('sessions') as FormArray;
  }

  get schedule() {
    return this.eventForm.get('schedule') as FormArray;
  }

  validInputSessionForm(name: string, index: number) {
    return (
      this.sessions.at(index).get(name)?.touched &&
      this.sessions.at(index).get(name)?.errors?.['required']
    );
  }

  validInput(name: string) {
    return (
      this.eventForm.get(name)?.touched &&
      this.eventForm.get(name)?.errors?.['required']
    );
  }

  initForm(): FormGroup { 
    return this.fb.group({
      id: [''],
      idBusiness: [ this.businessSelected?.id , [ Validators.required ]],
      idCategory: ['', [ Validators.required ]],
      idStaff: [''],
      maskStaff: [''],
      urlImage: [''],
      idCurrency: ['', [ Validators.required ]],
      type: [ 1, [ Validators.required ]],
      name: ['', [ Validators.required ]],
      description: [''],
      totalCapacity: ['', [ Validators.required ]],
      manyCanWaitList: ['', [ Validators.required ]],
      price: [''],
      pricePackage: [''],
      startDate: [''],
      endDate: [''],
      startTime: [''],
      endTime: [''],
      schedule: this.fb.array([ this.initScheduleForm() ]),
      sessions: this.fb.array([ this.initSessionsForm() ]),
      cancellationPolicy: this.initCancelationForm(),
    });
  }

  initCancelationForm(): FormGroup {
    return this.fb.group({
      cancellationAccept: ['', [ Validators.required ]],
      cancellationCharge: ['', [ Validators.required ]],
      hoursBefore: ['', [ Validators.required ]],
      cancellationFee: ['', [ Validators.required ]],
      idCurrency: [''],
    });
  }

  initSessionsForm(): FormGroup {
    return this.fb.group({
      id: [''],
      sessionName: ['', [ Validators.required ]],
      // salesChannels: ['', [ Validators.required ]],
      idCurrency: [''],
      idStaff: [''],
      maskStaff: ['', [ Validators.required ]],
      sessionPrice: ['', [ Validators.required ]],
      date: ['', [ Validators.required ]],
      startTime: ['', [ Validators.required ]],
      endTime: ['', [ Validators.required ]],
      description: [''],
    });
  }

  initScheduleForm(): FormGroup {
    return this.fb.group({
      day: ['', [ Validators.required ]],
      startTime: [''],
      endTime: [''],
    });
  }

}
