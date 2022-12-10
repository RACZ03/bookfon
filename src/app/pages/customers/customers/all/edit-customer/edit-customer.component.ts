import { UsersService } from './../../../../../@core/services/users.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogsService } from 'src/app/@core/utils/catalogs.service';
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    private readonly fb: FormBuilder,
    private catalogSvc: CatalogsService,
    private userService: UsersService,
    private toast: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.formEdit = this.initForms();
    this.loadSex();
  }

  onSubmit() {
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
        this.toast.success('Customer updated successfully', 'Success');
      }).catch(error => {
        this.loading = false;
        console.log(error);
        this.toast.error('Error unexpected, update customer', 'Error');
      });
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
    this.item = obj;
    this.formEdit.reset({
      id: obj.id,
      firstName: obj.firstName,
      lastName: obj.lastName,
      phone: obj.phone,
    });
    let { idSex } = obj;
    for (let i = 0; i < this.sexList.length; i++) {
      if (this.sexList[i].id == idSex) {
        let radio = document.getElementById('radioSex' + i) as HTMLInputElement;
        radio.checked = true;
      }
    }
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

  initForms(): FormGroup {
    return this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      sex: ['', []],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    })
  }

}
