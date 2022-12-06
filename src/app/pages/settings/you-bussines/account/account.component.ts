import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/@core/services/users.service';
declare var window: any;

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  public newUser: any = {};
  public formModalNew: any;
  public ModalStaffForm!: FormGroup;
  public identity: any;
  public token: string = '';
  public users: any[] = [];

  public scrollOptions: any[] = [
    { title: 'Staff permissions', active: true },
  ];
  public optionSelected: number = 0;

  constructor(
    private usersService: UsersService,
    private readonly fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.formModalNew = new window.bootstrap.Modal(
      document.getElementById('modalNewStaff2')
    );
    this.ModalStaffForm = this.initForms();
    let data = localStorage.getItem('identity') || '{}';
    this.identity = JSON.parse(data);
    let token = localStorage.getItem('token') || '';
    this.token = token;
    if (this.token){
      this.getUsers();
    }
  }

  async getUsers(){
    let resp = await this.usersService.getAllStaffByBusiness(this.identity.businessList[0].code);
    if (resp.status === '200' && resp.data){
      this.users = resp.data;
    }
  }

  initForms(): FormGroup {
    return this.fb.group({
     id: [''],
     staffname: ['', [Validators.required ]],
     stafflastName: ['', Validators.required],
     staffemail: ['', Validators.required],
     staffphone: ['', Validators.required],
     staffpassword: ['', Validators.required],
     staffprofile: ['', Validators.required],
     staffsex: ['', Validators.required],
     staffrole: ['', Validators.required]
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

  showModal(e: boolean = false) {
    if ( !e ) {
      return
    }

    this.formModalNew.show();
  }

  closeModal(band: boolean) {

    if ( band )
      this.formModalNew.hide();

    this.getUsers();
  }


  async onSaveStaff(){
    let data = {
      firstName: this.ModalStaffForm.value.staffname,
      lastName: this.ModalStaffForm.value.stafflastName,
      phone: this.ModalStaffForm.value.staffphone,
      email: this.ModalStaffForm.value.staffemail,
      password: this.ModalStaffForm.value.staffpassword,
      profile: this.ModalStaffForm.value.staffprofile,
      image: "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png",
      idSex: this.ModalStaffForm.value.staffsex,
      role: this.ModalStaffForm.value.staffrole
    }

    let resp = await this.usersService.saveStaff(data, this.identity.businessList[0].code);

    if (resp)
    {
      this.closeModal(true);
    }
  }
}
