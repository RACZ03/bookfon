import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/@core/services/users.service';
declare var window: any;

@Component({
  selector: 'app-tearm-users-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() userList: any[] = [];
  @Input() businessCode: string = '';
  @Output() onCloseModal = new EventEmitter<boolean>();
  public newUser: any = {};
  public formModalNew: any;
  public ModalStaffForm!: FormGroup;

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
      document.getElementById('modalNewStaff')
    );
    this.ModalStaffForm = this.initForms();
  }

  initForms(): FormGroup {
    return this.fb.group({
     id: [''],
     name: ['', [Validators.required ]],
     lastName: ['', Validators.required],
     email: ['', Validators.required],
     phone: ['', Validators.required],
     password: ['', Validators.required],
     profile: ['', Validators.required],
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

  showModal(e: boolean = false) {
    if ( !e ) {
      return
    }

    this.formModalNew.show();
  }

  closeModal(band: boolean) {

    if ( band )
      this.formModalNew.hide();

    this.onCloseModal.emit(true);
  }


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

    let resp = await this.usersService.saveStaff(data, this.businessCode);

    if (resp)
    {
      this.closeModal(true);
    }
  }
}
