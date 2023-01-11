import { UsersService } from './../../../../../@core/services/users.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogsService } from 'src/app/@core/utils/catalogs.service';
import { ToastrService } from 'ngx-toastr';
import { AlertService } from 'src/app/@core/utils/alert.service';
import { CustomersService } from 'src/app/@core/services/customers.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {

  public title: string = 'Edit Customer';
  formEdit!: FormGroup;
  public sexList: any[] = [];
  loading: boolean = false;
  item: any;
  @Input() set customer(obj: any) {
    this.loadForm(obj);
  }
  @Output() onClose = new EventEmitter<boolean>();

  public emailRegex: string ='^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  public isNew: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
    private catalogSvc: CatalogsService,
    private userService: UsersService,
    private alertSvc: AlertService,
    private customerSvc: CustomersService
  ) {
  }

  ngOnInit(): void {
    this.formEdit = this.initForms();
    this.loadSex();
  }

  async onSubmit() {

    let email = this.formEdit.get('email')?.value;
    if ( this.isNew ) {
      // validate email
      if ( email == '' || email == undefined ) {
        this.alertSvc.showAlert(3, '', 'Email is required');
        return;
      }
      // validate password
      let password = this.formEdit.get('password')?.value;
      let password_confirm = this.formEdit.get('password_confirm')?.value;

      if ( password === undefined || password === null || password === '') {
        this.alertSvc.showAlert(3, '', 'please add password');
        return;
      }
      if ( password_confirm === undefined || password_confirm === null || password_confirm === '') {
        this.alertSvc.showAlert(3, '', 'please confirm password');
        return;
      }
    }

    if ( this.isNew ) {
      let resp = await this.customerSvc.save(this.formEdit.value);
      // console.log(resp);
      if ( resp !== undefined ) {
        let { status, message } = resp;
        if ( status !== undefined && status == 200 || status == 201 ) {
          this.alertSvc.showAlert(1, '', 'Customer created successfully');
          this.onClose.emit(true);
          this.formEdit.reset();
          return
        } else {
          this.alertSvc.showAlert(4, '', 'Error');
          this.onClose.emit(true);
          return
        }
      }
    } else {
      if (this.formEdit.valid) {
        this.loading = true;
        this.userService.put({
          id: this.item.id,
          firstName: this.formEdit.get('firstName')?.value,
          lastName: this.formEdit.get('lastName')?.value,
          phone: this.formEdit.get('phone')?.value,
          idSex: this.formEdit.get('sex')?.value
        }).then(() => {
          this.loading = false;
          this.onClose.emit(true);
          // this.toast.success('Customer updated successfully', 'Success');
          this.alertSvc.showAlert(1, '', 'Customer updated successfully');
        }).catch(error => {
          this.loading = false;
          // console.log(error);
          this.onClose.emit(true);
          // this.toast.error('Error updating customer', 'Error');
          this.alertSvc.showAlert(3, '', 'Error updating customer');
        });
      }
    }
  }

  async loadSex() {
    this.sexList = [];
    let resp = await this.catalogSvc.getSexs();
    if (resp?.status == '200') {
      let { data } = resp;
      this.sexList = data;
    }
  }

  selectedSex(item: any) {
    this.formEdit.get('sex')?.patchValue(item.id);
  }

  loadForm(obj: any = null) {
    if (obj === null || obj === undefined) {
      return
    }

    let { isNew } = obj;
    if ( isNew !== undefined ) {
      this.isNew = true;
      this.title = 'New Customer';
      // get email and phone from storage
      let data = JSON.parse(localStorage.getItem('new-user') || '');
     // delete localstorage item new-user
      localStorage.removeItem('new-user');
      if ( data !== undefined ) {
        let { email, phone } = data;
        obj.email = email;
        obj.phone = phone;
        //  this.form.get('role')?.setValue(role);
      }
    }


    this.item = obj;
    // console.log(obj)
    this.formEdit.reset({
      id: obj.id,
      firstName: obj.firstName,
      lastName: obj.lastName,
      phone: obj.phone,
      email: obj.email,
      sex: obj.idSex
    });
    // let { idSex } = ob/j;

    // for (let i = 0; i < this.sexList.length; i++) {
    //   if (this.sexList[i].id == idSex) {
    //     let radio = document.getElementById('radioSex' + i) as HTMLInputElement;
    //     radio.checked = true;
    //   }
    // }
  }

  validInput(name: string) {
    return this.formEdit.get(name)?.touched && this.formEdit.get(name)?.errors?.['required'];
  }

  validInputMin(name: string) {
    return this.formEdit.get(name)?.touched && this.formEdit.get(name)?.errors?.['minlength'];
  }

  validInputMax(name: string) {
    return this.formEdit.get(name)?.touched && this.formEdit.get(name)?.errors?.['maxlength'];
  }

  validEmail(name: string) {
    return this.formEdit.get(name)?.touched && this.formEdit.get(name)?.errors?.['pattern'];
  }

  comparePasswords() {
    let pass = this.formEdit.get('password')?.value;
    let passConfirm = this.formEdit.get('password_confirm')?.value;

    if (pass !== passConfirm) {
      this.alertSvc.showAlert(3, '', 'Passwords do not match');
      // set value
      this.formEdit.get('password_confirm')?.setValue('');
    }
  }

  initForms(): FormGroup {
    return this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      sex: ['', []],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      email: [''],
      password: ['', [Validators.minLength(6), Validators.maxLength(12)]],
      password_confirm: ['', [Validators.minLength(6), Validators.maxLength(12)]],
    })
  }

}
