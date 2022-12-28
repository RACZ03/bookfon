import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogService } from 'src/app/@core/services/catalogs.service';
import { ServicesService } from 'src/app/@core/services/services.service';
import { AlertService } from 'src/app/@core/utils/alert.service';

declare var window: any;

@Component({
  selector: 'app-add-event-and-workshop',
  templateUrl: './add-event-and-workshop.component.html',
  styleUrls: ['./add-event-and-workshop.component.scss']
})
export class AddEventAndWorkshopComponent implements OnInit {

  public title: string = '';
  public currencies: any[] = [];
  public categoryData: any[] = [];
  public staffData: any[] = [];
  public formModalCategorie: any;
  eventForm!: FormGroup;

  public sessionsList: any[] = [];
  public daysList: any[] = [];

  public btnSession: boolean = true;

  constructor(
    private fb: FormBuilder,
    private catalogSvc: CatalogService,
    private serviceSvc: ServicesService,
    private alertSvc: AlertService
  ) { 
    this.sessionsList = [
      {
        sessionName: '',
        salesChannels: [],
        staff: '',
        maskStaff: '',
        sessionPrice: '',
        sessionDate: '',
        sessionStartTime: '',
        sessionEndTime: '',
      }
    ];

    this.daysList = [
      {
        day: 'Monday',
        active: false,
      },
      {
        day: 'Tuesday',
        active: false,
      },
      {
        day: 'Wednesday',
        active: false,
      },
      {
        day: 'Thursday',
        active: false,
      },
      {
        day: 'Friday',
        active: false,
      },
      {
        day: 'Saturday',
        active: false,
      },
      {
        day: 'Sunday',
        active: false,
      },
    ];
  }

  ngOnInit(): void {
    this.formModalCategorie = new window.bootstrap.Modal(
      document.getElementById('modalNewCategories')
    );

    this.eventForm = this.initForm();

    this.getCurrencies();
    this.loadDataCategories();
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
    let resp = await this.serviceSvc.getDataCategory();

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

  showModalCategoriesAdd(e: boolean) {
    if (!e) {
      return;
    }
    this.formModalCategorie.show();
    this.loadDataCategories();
  }

  addMoreSessions() {
    this.sessionsList.push({
      sessionName: '',
      salesChannels: [],
      staff: '',
      maskStaff: '',
      sessionPrice: '',
      sessionDate: '',
      sessionStartTime: '',
      sessionEndTime: '',
    });
  }

  removeItemSessions(index: number) { 
    this.sessionsList.splice(index, 1);
  }

  activeOptionDays(i: any) {
    this.daysList[i].active = !this.daysList[i].active;
  }

  onSubmit() {
  }

  validInput(name: string) {
    return (
      this.eventForm.get(name)?.touched &&
      this.eventForm.get(name)?.errors?.['required']
    );
  }

  initForm(): FormGroup { 
    return this.fb.group({
      name: ['', [ Validators.required ]],
      categories: [''],
      totalCapacity: ['', [ Validators.required ]],
      wailistCapacity: ['', [ Validators.required ]],
      price: ['', [ Validators.required ]],
      packagePrice: ['', [ Validators.required ]],
      hourBefore: ['', [ Validators.required ]],
      cancellationFee: ['', [ Validators.required ]],
      staff: ['', [ Validators.required ]],
    });
  }

}
