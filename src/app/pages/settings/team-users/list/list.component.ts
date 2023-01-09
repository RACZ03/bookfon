import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { SexsI, SexsItem } from 'src/app/@core/Interfaces/Sexs';
import { UsersService } from 'src/app/@core/services/users.service';
import { AlertService } from 'src/app/@core/utils/alert.service';
import { CatalogsService } from 'src/app/@core/utils/catalogs.service';
declare var window: any;

@Component({
  selector: 'app-tearm-users-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  
  @Input() userList: any[] = [];
  @Input() businessCode: string = '';
  @Output() onCloseModal = new EventEmitter<boolean>();
  public newUser: any = {};
  public formModalNew: any;
  public formModalValidate: any;
  public ModalStaffForm!: FormGroup;
  public emailRegex: string ='^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  sexs: SexsItem[] = [];

  public scrollOptions: any[] = [
    { title: 'Staff permissions', active: true },
  ];
  public optionSelected: number = 0;

  constructor(
    private usersService: UsersService,
    private readonly fb: FormBuilder,
    private alertSvc: AlertService,
    private catalogService: CatalogsService,
    private router: Router
  ) { 
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
      info: false,
    }
  }

  ngOnInit(): void {
    this.formModalNew = new window.bootstrap.Modal(
      document.getElementById('modalNewStaffSettings')
    );
    this.formModalValidate = new window.bootstrap.Modal(
      document.getElementById('modalValidateNewStaffSettings')
    );

    this.loadSex();
    this.ModalStaffForm = this.initForms();

    setTimeout(() => {
      if (this.userList.length > 0) {
        console.log(this.userList)
        this.dtTrigger.next(this.dtOptions);
      }
    }, 1000);
  }

  loadSex() {
    this.catalogService
      .getSexs()
      .then((res: SexsI) => {
        this.sexs = res?.data;
      })
      .catch((err) => {
        // console.log(err);
        // this.toast.error('Error unexpected, loading sex', 'Error');
      });
  }

  searchData(e: any) {
    let value = e.target.value;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.search(value).draw();
    });
  }

  initForms(): FormGroup {
    return this.fb.group({
     id: [''],
     name: ['', [Validators.required ]],
     lastName: ['', Validators.required],
     email: ['', [Validators.required, Validators.pattern(this.emailRegex)],],
     phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
     password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
     password_confirm: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
     profile: [''],
     sex: ['', Validators.required],
     role: ['', Validators.required]
    });
  }

  changeOptions(e: any, index: number) {
    for (let i = 0; i < this.scrollOptions.length; i++) {
      this.scrollOptions[i].active = false;

      if ( i == index )
        this.scrollOptions[i].active = true;
    }
    this.optionSelected = index;
  }

  // show modal validate
  showModal(e: boolean = false) {
    if ( !e ) {
      return
    }

    // Open modal validations
    // this.formModalValidate.show();
    this.formModalNew.show();
  }

  onCloseModalAndOpenOld(event: any) {
    if ( !event ) {
      this.formModalValidate.hide();
      this.router.navigate(['/pages/settings']);
      return
    } else {
      // Execute endpoint add permisses
      this.formModalValidate.hide();
      setTimeout(() => {
        this.formModalNew.show();
      }, 200);
    }
  }

  closeModal(band: boolean) {

    if ( band )
      this.formModalNew.hide();

    this.onCloseModal.emit(true);
  }

  /* SECTION VALIDATIONS */
  validInput(name: string) {
    return this.ModalStaffForm.get(name)?.touched && this.ModalStaffForm.get(name)?.errors?.['required'];
  }

  validInputMin(name: string) {
    return this.ModalStaffForm.get(name)?.touched && this.ModalStaffForm.get(name)?.errors?.['minlength'];
  }

  validEmail(name: string) {
    return this.ModalStaffForm.get(name)?.touched && this.ModalStaffForm.get(name)?.errors?.['pattern'];
  }

  comparePasswords() {
    let pass = this.ModalStaffForm.get('password')?.value;
    let passConfirm = this.ModalStaffForm.get('password_confirm')?.value;

    if (pass !== passConfirm) {
      this.alertSvc.showAlert(3, '', 'Passwords do not match');
      // set value
      this.ModalStaffForm.get('password_confirm')?.setValue('');
    }
  }
  // !SECTION VALIDATIONS

  async onSaveStaff(){
    let data = {
      firstName: this.ModalStaffForm.value.name,
      lastName: this.ModalStaffForm.value.lastName,
      phone: this.ModalStaffForm.value.phone,
      email: this.ModalStaffForm.value.email,
      password: this.ModalStaffForm.value.password,
      profile: this.ModalStaffForm.value.profile,
      image: "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png",
      idSex: this.ModalStaffForm.value.sex,
      role: this.ModalStaffForm.value.role
    }

    let resp = await this.usersService.saveUser(data, this.businessCode);

    if ( resp !== undefined ) {
      let { status, comment } = resp;
      if ( status == 201 || status == 200 ) {
        this.alertSvc.showAlert(1, '', comment);
        // this.closeModal(true);
        window.location.reload();
      } else {
        this.alertSvc.showAlert(3, '', (comment !== undefined ? comment : 'Error unexpected, try again'));
      }
    } else {
      this.alertSvc.showAlert(3, '', 'Error unexpected, try again');
    }
    // if (resp)
    // {
    //   this.alertSvc.showAlert(1, '', 'Staff added successfully');
    //   this.closeModal(true);
    // }
  }

  renderer() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
    });
  }

}
