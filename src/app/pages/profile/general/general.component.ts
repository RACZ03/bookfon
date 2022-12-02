import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/@core/services/users.service';

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
    private userSvc: UsersService
  ) { 
    this.identity = JSON.parse(localStorage.getItem('identity') || '{}');
    this.roleList = this.identity?.roleList;
  }

  ngOnInit(): void {
    this.profileForm = this.initForm();
  }

  async handleSave() {
    if (this.profileForm.valid) {
      let resp = await this.userSvc.put(this.profileForm.value);
      console.log(resp);
    }
  }

  /* Upload file */
  async onFileSelected(event: any) {
    // get file selected and send to service
    let file = event.target.files[0];
    let id = this.identity.id;
    // let resp = await this.userSvc.uploadImage(file, id);

    // console.log(resp);s
    // if ( resp != null || resp != undefined ) {
    //   let { status } = resp;
    //   if ( status == 200 ) {
    //     this.alertSvc.showAlert(1, resp?.message, 'Success')
    //     this.identity.image_profile = resp?.image;
    //     localStorage.setItem('identity', JSON.stringify(this.identity));
    //     this.loadData();
    //   } else {
    //     this.alertSvc.showAlert(4, resp?.message, 'Error')
    //   }
    // } else {
    //   this.alertSvc.showAlert(4, 'Error al guardar', 'Error')
    // }
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

}
