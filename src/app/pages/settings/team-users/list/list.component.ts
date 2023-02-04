import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { SexsI, SexsItem } from 'src/app/@core/Interfaces/Sexs';
import { CatalogService } from 'src/app/@core/services/catalogs.service';
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
  public modalDelete: any;

  public emailRegex: string ='^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  sexs: SexsItem[] = [];
  public roles: [] = [];
  public isEdit: boolean = false;
  public backupEdit: any = {};
  public emailError: boolean = false;
  public phoneError: boolean = false;
  public itemDelete: any = {};

  public scrollOptions: any[] = [
    { title: 'Staff permissions', active: true },
  ];
  public optionSelected: number = 0;

  constructor(
    private usersService: UsersService,
    private readonly fb: FormBuilder,
    private alertSvc: AlertService,
    private catalogService: CatalogsService,
    private catalogSvc: CatalogService,
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
    this.modalDelete = new window.bootstrap.Modal(
      document.getElementById('modalDeleteStaffSettings')
    );

    this.loadSex();
    this.getRoles();
    this.ModalStaffForm = this.initForms();

    setTimeout(() => {
      if (this.userList.length > 0) {
        // console.log(this.userList)
        this.dtTrigger.next(this.dtOptions);
      }
    }, 1000);
  }

  async getRoles() {
    let resp = await this.catalogSvc.getRoles();
    if ( resp !== undefined ) {
      let { status } = resp;
      if ( status == 200 ) {
        let { data } = resp;
        this.roles = data;
        // console.log(this.roles)
      }
    }
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
     firstName: ['', [Validators.required ]],
     lastName: ['', Validators.required],
     email: ['', [Validators.required, Validators.pattern(this.emailRegex)],],
     phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
     password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
     password_confirm: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
     profile: [''],
     idSex: ['', Validators.required],
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
    this.formModalValidate.show();
    // this.formModalNew.show();
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

        // get data email and phone from localstorage
        let data = JSON.parse(localStorage.getItem('new-user') || '');
        // delete localstorage item new-user
        localStorage.removeItem('new-user');
        if ( data !== undefined ) {
          let { email, phone, role } = data;
          this.ModalStaffForm.get('email')?.setValue(email);
          this.ModalStaffForm.get('phone')?.setValue(phone);
          this.ModalStaffForm.get('role')?.setValue(role);
        }

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

    if ( this.isEdit ) {
      this.sendEdit(this.ModalStaffForm.value);
      return
    }

    // verify emailErro or phoneError is true
    if ( this.emailError || this.phoneError ) {
      this.alertSvc.showAlert(3, '', 'Email or phone already exists');
      return;
    }

    let data = {
      firstName: this.ModalStaffForm.value.firstName,
      lastName: this.ModalStaffForm.value.lastName,
      phone: this.ModalStaffForm.value.phone,
      email: this.ModalStaffForm.value.email,
      password: this.ModalStaffForm.value.password,
      profile: this.ModalStaffForm.value.profile,
      image: "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png",
      idSex: this.ModalStaffForm.value.idSex,
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

  async verifyUser(byEmail: boolean = false ){
    // console.log('VERIFY')
    let email = null;
    let phone = null;
    if ( byEmail ) {
      email = this.ModalStaffForm.value.email;
    } else {
      phone = this.ModalStaffForm.value.phone;
      if ( phone < 10) {
        return;
      }
    }
    let role = this.ModalStaffForm.value.role;
    let resp = await this.usersService.verifyUser(email, phone, role);

    if ( resp !== undefined ) {
      let { status, data } = resp;
      if ( status == 200) {
        let { withEmail, withPhone } = data; 
        // validate email is iqualts backup email
        if ( withEmail ) {
          if ( this.backupEdit.email !== email ) { 
            this.emailError = true;
            this.alertSvc.showAlert(3, '', 'Email already exists');
            // set invalid form control email
            // this.ModalStaffForm.get('email')?.setErrors({'incorrect': true});
          }
        } else {
          // validate email is iqualts backup phone
          if ( withPhone ) {
            if ( this.backupEdit.phone !== phone ) {
              this.alertSvc.showAlert(3, '', 'Phone already exists');
              this.phoneError = true;
            }
          }
        }
      } else {
        if ( byEmail ) {
          this.emailError = false;
        } else {
          this.phoneError = false;
        }
      }
    }
  }

  // Edit
  async edit(id: number) {
    
    let resp = await this.usersService.findById(id);
    if ( resp !== undefined ) {
      let { status, comment, data } = resp;
      if ( status == 200 ) {
        this.loadDataForm(data);
        this.formModalNew.show();
      } else {
        this.alertSvc.showAlert(3, '', (comment !== undefined ? comment : 'Error unexpected, try again'));
      }
    } else {
      this.alertSvc.showAlert(3, '', 'Error unexpected, try again');
    }
  }
  
  loadDataForm(data: any) {
    this.backupEdit = data;
    // console.log(data);
    this.isEdit = true;
    this.ModalStaffForm.get('id')?.setValue(data.id);
    this.ModalStaffForm.get('firstName')?.setValue(data.firstName);
    this.ModalStaffForm.get('lastName')?.setValue(data.lastName);
    this.ModalStaffForm.get('phone')?.setValue(data.phone);
    this.ModalStaffForm.get('email')?.setValue(data.email);
    this.ModalStaffForm.get('profile')?.setValue(data.profile);
    this.ModalStaffForm.get('idSex')?.setValue(data.idSex);
    this.ModalStaffForm.get('password')?.setValue('123456');
    this.ModalStaffForm.get('password_confirm')?.setValue('123456');    

  
    let { roleList } = data;
    if ( roleList !== undefined ) {
      let found = roleList.find((item: any) => item.role == 'ROLE_SUPER_ADMIN' || item.role == 'ROLE_ADMIN');
      if ( found !== undefined ) {
        this.ModalStaffForm.get('role')?.setValue(found.role);
        // disabled role
        this.ModalStaffForm.get('role')?.disable();
      }
    }
    // this.ModalStaff
  }

  async sendEdit(data: any) {
    // verify emailErro or phoneError is true
    if ( this.emailError || this.phoneError ) {
      this.alertSvc.showAlert(3, '', 'Email or phone already exists');
      return;
    }
    //remove password and password_confirm
    delete data.password;
    delete data.password_confirm;

    let resp = await this.usersService.put(data);
    if ( resp !== undefined ) {
      let { status, comment } = resp;
      if ( status == 200 ) {
        this.alertSvc.showAlert(1, '', comment);
        this.closeModal(true);
      } else {
        this.alertSvc.showAlert(3, '', (comment !== undefined ? comment : 'Error unexpected, try again'));
      }
    } else {
      this.alertSvc.showAlert(3, '', 'Error unexpected, try again');
    }
  }

  // Delete
  showModalDelete(item: any) {
    this.itemDelete = item;
    // open modal
    this.modalDelete.show();
  }

  async onDelete(e: any) {
    this.modalDelete.hide();
    if ( !e ) {
      return;
    }
    // hide
    let resp = await this.usersService.removeRole(this.itemDelete.email, 'ROLE_ADMIN');
    if ( resp !== undefined ) {
      let { status, comment } = resp;
      if ( status == 200 ) {
        this.alertSvc.showAlert(1, '', comment);
        this.renderer();
      } else {
        this.alertSvc.showAlert(3, '', (comment !== undefined ? comment : 'Error unexpected, try again'));
      }
    } else {
      this.alertSvc.showAlert(3, '', 'Error unexpected, try again');
    }
  }
}
