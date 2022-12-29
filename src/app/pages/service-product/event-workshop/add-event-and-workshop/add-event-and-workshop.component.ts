import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  public formModalCategorie: any;
  eventForm!: FormGroup;
  public urlImage: string = 'https://firebasestorage.googleapis.com/v0/b/bpb-training.appspot.com/o/workshops%2Fheroes.jpg-1672286257914?alt=media&token=e8eb097d-3544-4a15-bd4a-c6cb720105ff';

  public daysList: any[] = [];

  public btnSession: boolean = true;
  public businessSelected: any = {};

  constructor(
    private fb: FormBuilder,
    private catalogSvc: CatalogService,
    private eventWorkshopSvc: EventWorkshopService,
    private staffSvc: StaffService,
    private alertSvc: AlertService,
    private router: Router
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
        // console.log(data);
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

  verifyAmount() {
    // console.log('verifyAmount');
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
    this.sessions.removeAt(index);
  }

  activeOptionDays(i: any) {
    this.daysList[i].active = !this.daysList[i].active;
  }

  async onSubmit() {
    // Validate urlImage not empty
    let urlImage = this.eventForm.get('urlImage')?.value;
    if ( urlImage === '' || urlImage === undefined || urlImage === null ) {
      this.alertSvc.showAlert(4,  'Error', 'The image is required');
      return;
    }

    let type = this.eventForm.get('type')?.value;
    let resp;
    // IF TYPE IS 1: save session
    if (type === 1) {
      resp = await this.eventWorkshopSvc.saveSession(this.eventForm.value);
    } else {
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

      resp = await this.eventWorkshopSvc.saveConsecutive(this.eventForm.value);
    }

    if (resp != undefined || resp != null) {
      if (resp.status === 404) {
        this.alertSvc.showAlert(4, '', 'Error');
      } else {
        this.alertSvc.showAlert(1, 'Success', 'Workshop saved successfully');
        this.router.navigate(['/pages/services']);
      }
    } else {
      this.alertSvc.showAlert(3, '', 'Registration not done');
    }

    // console.log(resp);
  }

  changeType(type: number) {
    this.btnSession = !this.btnSession;

    // set idType
    this.eventForm.get('type')?.setValue((this.btnSession) ? 1 : 2);
  }

  get sessions() {
    return this.eventForm.get('sessions') as FormArray;
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
      idStaff: ['', [ Validators.required ]],
      maskStaff: [''],
      urlImage: ['https://firebasestorage.googleapis.com/v0/b/bpb-training.appspot.com/o/workshops%2Fheroes.jpg-1672286257914?alt=media&token=e8eb097d-3544-4a15-bd4a-c6cb720105ff', [ Validators.required ]],
      idCurrency: ['', [ Validators.required ]],
      type: [ 1, [ Validators.required ]],
      name: ['', [ Validators.required ]],
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
      sessionName: ['', [ Validators.required ]],
      // salesChannels: ['', [ Validators.required ]],
      idCurrency: [''],
      idStaff: ['', [ Validators.required ]],
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
