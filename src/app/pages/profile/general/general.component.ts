import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/@core/services/users.service';
import { AlertService } from 'src/app/@core/utils/alert.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {

  public isAdmin: boolean = false;
  public identity: any;
  public profileForm!: FormGroup;
  public roleList: any;

  constructor(
    private fb: FormBuilder,
    private userSvc: UsersService,
    private alertSvc: AlertService
  ) { 
    this.identity = JSON.parse(localStorage.getItem('identity') || '{}');
    this.roleList = this.identity?.roleList;
  }

  ngOnInit(): void {
    this.profileForm = this.initForm();
    setTimeout(() => {
      console.log(this.identity)
      this.updateDataUser();
    }, 1000);
  }

  async handleSave() {
    if (this.profileForm.valid) {
      let resp = await this.userSvc.put(this.profileForm.value);
      // console.log(resp);
    }
  }

  handleInputFile() {
    let input = document.getElementById('file') as HTMLInputElement;
    input?.click();
  }
  /* Upload file */
  async onFileSelected(event: any) {
    // get file selected and send to service
    let file = event.target.files[0];
    let resp = await this.userSvc.uploadImage(file, this.identity, this.isAdmin);

    if ( resp != null || resp != undefined ) {
      let { status } = resp;
      if ( status == 200 ) {
        this.alertSvc.showAlert(1, resp?.message, 'Success')
        this.updateDataUser();
      } else {
        this.alertSvc.showAlert(4, resp?.message, 'Error')
      }
    } else {
      this.alertSvc.showAlert(4, 'Error al guardar', 'Error')
    }
  }


  /* SECTION VALIDATIONS */
  validInput(name: string) {
    return this.profileForm.get(name)?.touched && this.profileForm.get(name)?.errors?.['required'];
  }

  validInputMin(name: string) {
    return this.profileForm.get(name)?.touched && this.profileForm.get(name)?.errors?.['minlength'];
  }

  validInputMax(name: string) {
    return this.profileForm.get(name)?.touched && this.profileForm.get(name)?.errors?.['maxlength'];
  }

  validEmail(name: string) {
    return this.profileForm.get(name)?.touched && this.profileForm.get(name)?.errors?.['pattern'];
  }

  initForm(): FormGroup {
    let found = this.roleList.find((item: any) => item.role === "ROLE_ADMIN");

    if ( found !== undefined ) {
      this.isAdmin = true;
      return this.fb.group({
        id: [this.identity.id, Validators.required],
        firstName: [this.identity?.firstName, [Validators.required]],
        lastName: [this.identity?.lastName, [Validators.required]],
        phone: [this.identity?.phone, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
        email: [this.identity?.email, [Validators.required, Validators.email]],
        idSex: [(this.identity?.idSex !== null ? this.identity?.idSex : 0), [Validators.required]],
      });
    } else {
      return this.fb.group({
        id: [this.identity.id, Validators.required],
        firstName: [this.identity?.firstName, [Validators.required]],
        lastName: [this.identity?.lastName, [Validators.required]],
        phone: [this.identity?.phone, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
        email: [this.identity?.email, [Validators.required, Validators.email]],
        review: [this.identity?.review, [Validators.required]],
        idSex: [(this.identity?.idSex !== null ? this.identity?.idSex : 0), [Validators.required]],      
      });
    }
  }

  async updateDataUser() {
    console.log(this.identity);
    let id = this.identity.id;
    
  //   let resp = await this.userSvc.findByEmail(this.identity?.email);
  //   console.log(resp)
  }

}
