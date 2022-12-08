import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { AvailavilityService } from 'src/app/@core/services/avaivility.service';
import { UsersService } from 'src/app/@core/services/users.service';

import { AlertService } from 'src/app/@core/utils/alert.service';

@Component({
  selector: 'app-add-availability',
  templateUrl: './add-availability.component.html',
  styleUrls: ['./add-availability.component.css']
})
export class AddAvailabilityComponent implements OnInit {

  @Output() onClose = new EventEmitter<boolean>();
  @Input() set dataUpdate(value: any) {

    if (value!= undefined && value != null && value != false) {
    }
    this.loadDataForm(value);
  }

  @Input() isCoach = false;
  public idCoach: number = 0;
  @Input() set loadIdProfile(value: any) {
    if ( value)
      this.idCoach = parseInt(value);
  }
  
  coachScheduleForm!: FormGroup;
  public listCoachs: any[] = [];
  public scheduleRanger: any[] = [];
  public dataDelete: any[] = [];
  public businessSelected: any = {};

  public days: any[] = [
    { id: 0, day: 0, dayLetter: 'Monday', active: false, disabled: true, position: 1, startTime: '', endTime: '', bc_start: '', bc_end: '' }, 
    { id: 0, day: 1, dayLetter: 'Tuesday', active: false, disabled: true, position: 1, startTime: '', endTime: '', bc_start: '', bc_end: '' }, 
    { id: 0, day: 2, dayLetter: 'Wednesday', active: false, disabled: true, position: 1, startTime: '', endTime: '', bc_start: '', bc_end: '' }, 
    { id: 0, day: 3, dayLetter: 'Thursday', active: false, disabled: true, position: 1, startTime: '', endTime: '', bc_start: '', bc_end: '' }, 
    { id: 0, day: 4, dayLetter: 'Friday', active: false, disabled: true, position: 1, startTime: '', endTime: '', bc_start: '', bc_end: '' }, 
    { id: 0, day: 5, dayLetter: 'Saturday', active: false, disabled: true, position: 1, startTime: '', endTime: '', bc_start: '', bc_end: '' },
    { id: 0, day: 6, dayLetter: 'Sunday', active: false, disabled: true, position: 1, startTime: '', endTime: '', bc_start: '', bc_end: '' }
  ];

  public title: string = 'New Coach Availability';

  constructor(
    private readonly fb: FormBuilder,
    private availabilitySvc: AvailavilityService,
    private userSvc: UsersService,
    // private coachSvc: CoachService,
    private alertSvc: AlertService,
    // private spinnerSvc: SpinnerService
  ) { 
    this.businessSelected = JSON.parse(localStorage.getItem('businessSelected') || '{}');
  }

  ngOnInit(): void {
    this.coachScheduleForm = this.initForms();
    // console.log('j')
    console.log(this.businessSelected)
  }


  /* Section Save */
  async onSubmit() {
    let obj: any[] = [];
    for (let i = 0; i < this.days.length; i++) {
      if ( this.days[i].active && this.days[i].startTime != '' && this.days[i].startTime != undefined 
        && this.days[i].endTime != '' && this.days[i].endTime != undefined ) { 

        let start = moment(this.days[i].startTime, 'HH:mm:ss');
        let end = moment(this.days[i].endTime, 'HH:mm:ss');

        obj.push({
          id: (this.days[i].id == 0) ? null : parseInt(this.days[i].id),
          idDay: this.days[i].day,
          startTime: start.format('HH:mm:ss'),
          endTime: end.format('HH:mm:ss'),
          idStaff: this.idCoach,
          idBusiness: this.businessSelected?.id
        });
      }
    }

    if ( obj.length == 0 ) {
      this.alertSvc.showAlert(2, 'Please select at least one day and time range', 'Warning');
      return;
    }

    for (let i = 0; i < this.dataDelete.length; i++) {
      if ( this.dataDelete[i].id != 0 ) {
        obj.push({
          id: parseInt(this.dataDelete[i].id),
          idDay: this.dataDelete[i].day,
          startTime: this.dataDelete[i].startTime,
          endTime: this.dataDelete[i].endTime,
          idStaff: this.idCoach,
          idBusiness: this.businessSelected?.id,
          pasivo: true
        });
      }
    }
    console.log(obj)
    // Send Data
    // this.spinnerSvc.show();
    let resp = await this.availabilitySvc.saveAvailability(obj);

    
    // this.spinnerSvc.hide();
    if ( resp != null || resp != undefined ) {
      let { status } = resp;
      if ( status == 201 ) {
        this.alertSvc.showAlert(1, resp?.comment, 'Success');
        this.loadDataForm();
        this.onClose.emit(true);
      } else {
        this.alertSvc.showAlert(4, resp?.comment, 'Error')
      } 
    } else {
      this.alertSvc.showAlert(4, 'Error', 'Error')
    }
  }

  /* Load Data Form */
  loadDataForm(data: any = null) {

    if ( this.coachScheduleForm == undefined )
      return;

    if ( data != null && data != undefined ) { 
      this.title = 'Update Coach Availability';
    } else {
      this.title = 'New Coach Availability';
    }

    let temp: any[] = [
      { id: 0, day: 0, dayLetter: 'Monday', active: false, disabled: true, position: 1, startTime: '', endTime: '', bc_start: '', bc_end: '' }, 
      { id: 0, day: 1, dayLetter: 'Tuesday', active: false, disabled: true, position: 1, startTime: '', endTime: '', bc_start: '', bc_end: '' }, 
      { id: 0, day: 2, dayLetter: 'Wednesday', active: false, disabled: true, position: 1, startTime: '', endTime: '', bc_start: '', bc_end: '' }, 
      { id: 0, day: 3, dayLetter: 'Thursday', active: false, disabled: true, position: 1, startTime: '', endTime: '', bc_start: '', bc_end: '' }, 
      { id: 0, day: 4, dayLetter: 'Friday', active: false, disabled: true, position: 1, startTime: '', endTime: '', bc_start: '', bc_end: '' }, 
      { id: 0, day: 5, dayLetter: 'Saturday', active: false, disabled: true, position: 1, startTime: '', endTime: '', bc_start: '', bc_end: '' },
      { id: 0, day: 6, dayLetter: 'Sunday', active: false, disabled: true, position: 1, startTime: '', endTime: '', bc_start: '', bc_end: '' }
    ];

    if ( data != undefined || data != null || data != false ) {
      // this.spinnerSvc.hide();
      
      // Verify data for day Monday
      let monday = this.loadDay(data, 'Monday', 0);
      let tuesday = this.loadDay(data, 'Tuesday', 1);
      let wednesday = this.loadDay(data, 'Wednesday', 2);
      let thursday = this.loadDay(data, 'Thursday', 3);
      let friday = this.loadDay(data, 'Friday', 4);
      let saturday = this.loadDay(data, 'Saturday', 5);
      let sunday = this.loadDay(data, 'Sunday', 6);

      temp.push(...monday, ...tuesday, ...wednesday, ...thursday, ...friday, ...saturday, ...sunday);

      this.orderData(temp, true);
      
    }
  }

  loadDay(data: any, dayLetter: string, day: number) {
    if ( data == undefined || data == null || data?.length == 0 ) 
      return [];

    let found: any = data?.filter( (x: any) => x.dia == day );
    let temp: any[] = [];
    if ( found && found.length > 0 ) {
      if ( found.length == 1 ) {
        temp.push({ id: found[0].id, day, dayLetter, active: true, disabled: false, position: 1, startTime: found[0].horaInicio, endTime: found[0].horaFin, bc_start: '', bc_end: ''} );
      } else {
        for (let i = 0; i < found.length; i++) {
          temp.push({ id: found[i]?.id, day, dayLetter, active: true, disabled: false, position: (i+1), startTime: found[i]?.horaInicio, endTime: found[i]?.horaFin, bc_start: '', bc_end: ''} );
        }
      }
    }
    return temp;
  }

  activeDay(item: any) { 
    let found = this.days.filter( x => x.day == item.day );
    if ( found ) {
      if ( found.length == 1 ) {
        found[0].active = !found[0].active;
        found[0].disabled = !found[0].disabled;

        if ( !item.active ) 
          this.dataDelete.push(found[0]);
      } else {
        for (let i = 0; i < found.length; i++) {
          found[i].active = !found[i].active;
          found[i].disabled = !found[i].disabled;
          this.dataDelete.push(found[i]);
          if ( i > 0 ) {
            let index = this.days.findIndex( x => x.day == item.day && x.position == found[i].position );
            this.days.splice(index, 1);
          }
            // this.days = this.days.filter( x => x.day != item.day && x.position != found[i].position );
        }
      }

    }
  }

  addBlock(item: any) {
    let matchFix = this.days.filter( x => x.day == item.day );
    let noMatchFix = this.days.filter( x => x.day != item.day );
    let temp: any[] = [];
    if ( matchFix ) {
      let row = [{ id: 0, day: matchFix[0].day, dayLetter: matchFix[0].dayLetter, active: true, disabled: false, position: (matchFix.length+1) }];
      temp = [...matchFix, ...row, ...noMatchFix];
    } else {
      temp = [...matchFix, ...noMatchFix];
    }

    this.orderData(temp);
  }

  orderData(temp: any, isEdit: boolean = false) {
    let dayMonday = temp.filter( (x: any) => x.day == 0 ).sort( (a: any, b: any) => a.position - b.position );
    let dayTuesday = temp.filter( (x: any) => x.day == 1 ).sort( (a: any, b: any) => a.position - b.position );
    let dayWednesday = temp.filter( (x: any) => x.day == 2 ).sort( (a: any, b: any) => a.position - b.position );
    let dayThursday = temp.filter( (x: any) => x.day == 3 ).sort( (a: any, b: any) => a.position - b.position );
    let dayFriday = temp.filter( (x: any) => x.day == 4 ).sort( (a: any, b: any) => a.position - b.position );
    let daySaturday = temp.filter( (x: any) => x.day == 5 ).sort( (a: any, b: any) => a.position - b.position );
    let daySunday = temp.filter( (x: any) => x.day == 6 ).sort( (a: any, b: any) => a.position - b.position );

    if ( isEdit ) {
      //Delete duplicate records
      if ( dayMonday?.length > 1 )
        dayMonday = this.cleanDuplicate(dayMonday);
      if ( dayTuesday?.length > 1 )
        dayTuesday = this.cleanDuplicate(dayTuesday);
      if ( dayWednesday?.length > 1 )
        dayWednesday = this.cleanDuplicate(dayWednesday);
      if ( dayThursday?.length > 1 )
        dayThursday = this.cleanDuplicate(dayThursday);
      if ( dayFriday?.length > 1 )
        dayFriday = this.cleanDuplicate(dayFriday);
      if ( daySaturday?.length > 1 )
        daySaturday = this.cleanDuplicate(daySaturday);
      if ( daySunday?.length > 1 )
        daySunday = this.cleanDuplicate(daySunday);
    }

    this.days = [...dayMonday, ...dayTuesday, ...dayWednesday, ...dayThursday, ...dayFriday, ...daySaturday, ...daySunday];
  }

  cleanDuplicate(data: any) {
    return data.filter( (x: any) => x.startTime != '' && x.endTime != '');
  }

  removeRow(index: number, item: any) {
    if ( item.id != undefined && item.id > 0 ) {
      this.dataDelete.push(item);
    }
    this.days.splice(index, 1);
  }

  validStartHour(e: any, position: number, item: any) {
    item.startTime = e.target.value;
    if ( position == 1) {
      return;
    }

    let found = this.days.find( x => x.day == item.day && x.position == (position-1) );
    if ( found?.endTime >= item.startTime ) {
      this.alertSvc.showAlert(2, 'Start hour must be greater than the previous one', 'Warning');
      item.bc_start = 'is-invalid';
      e.target.value = '';
    } else {
      item.bc_start = '';
    }
  }

  validEndHour(e: any, item: any) {

    item.endTime = e.target.value;

    if ( e.target.value <= item.startTime ) {
      this.alertSvc.showAlert(2, 'End hour must be greater than the start hour', 'Warning');
      item.bc_end = 'is-invalid'
      e.target.value = '';
    } else {
      item.bc_end = '';
    }
  }

  /* Validations */
  validInput(name: string) {
    return this.coachScheduleForm.get(name)?.touched && this.coachScheduleForm.get(name)?.errors?.['required'];
  }

  initForms(): FormGroup {
    return this.fb.group({
      id: [0],
      coachId: [0, [Validators.required] ],
      day: [''],
      startTime: [''],
      endTime: [''],
    })
  }

}
