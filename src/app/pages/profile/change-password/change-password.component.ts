import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/@core/services/auth.service';
import { UsersService } from 'src/app/@core/services/users.service';
import { AlertService } from 'src/app/@core/utils/alert.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  passForm!: FormGroup;
  public id!: number;
  public title = 'Change Password';

  public fieldTextType: boolean = true;
  public fieldTextType2: boolean = true;
  public samePassword: boolean = false;
  public disabled: boolean = false;
  private identity: any = {};

  constructor(
    private readonly fb: FormBuilder,
    private userSvc: UsersService,
    private alertSvc: AlertService,
    private authSvc: AuthService
  ) {
  }

  async ngOnInit() {
    this.passForm = this.initForms();
    let user = await this.authSvc.getIdentity();
    this.identity = JSON.parse(user);
    this.id = this.identity.id;
  }

  changeType(input: any) {
    if ( input !== undefined ) 
      input.type = input.type === 'password' ? 'text' : 'password';

    this.fieldTextType = !this.fieldTextType;
    const icon = document.getElementById('iconChangePass1') as HTMLElement;
    
    if ( this.fieldTextType ) {
      icon?.classList.remove('bi-eye-slash');
      icon?.classList.add('bi-eye');
    } else {
      icon?.classList.remove('bi-eye');
      icon?.classList.add('bi-eye-slash');
    }
  }

  changeType2(input: any) {
    if ( input !== undefined ) 
      input.type = input.type === 'password' ? 'text' : 'password';

    this.fieldTextType = !this.fieldTextType;
    const icon = document.getElementById('iconChangePass2');

    if ( this.fieldTextType ) {
      icon?.classList.remove('bi-eye-slash');
      icon?.classList.add('bi-eye');
    } else {
      icon?.classList.remove('bi-eye');
      icon?.classList.add('bi-eye-slash');
    }
  }

  validInput(name: string) {
    return this.passForm.get(name)?.touched && this.passForm.get(name)?.errors?.['required'];
  }
  validateInputLength(name: string) {
    return this.passForm.get(name)?.touched && this.passForm.get(name)?.errors?.['minlength'];
  }

  initForms(): FormGroup {
    return this.fb.group({
      id: [this.id],
      password: ['', [Validators.required, Validators.minLength(6)] ],
      passVerify: ['', [Validators.required, Validators.minLength(6)] ],
    })
  }

  selectDefault() {
    this.resetForm(true);
  }

  resetForm(obj: boolean) {
    this.passForm.reset({
      id: this.id,
      password: (obj == false) ? '' : '12345678',
      passVerify: (obj == false ) ? '' : '12345678',
    }); 
  }


  async onSubmit() {
    if ( this.passForm.invalid ){ 
      return
    }
    let pass = this.passForm.get('password')?.value;
    let resp = await this.userSvc.changePassword(this.id, pass );
    if ( resp ) {
      this.alertSvc.showAlert(1, 'Success', 'Updated password');
      let email = this.identity.email
      this.authSvc.logout(email);
    } else {
      this.alertSvc.showAlert(4, 'Error', 'Could not update password');
    }
  }

  comparePassword() {
    let pass;
    let passVerify;
    
    let length1 = this.passForm.get('password')?.value.length;
    let length2 = this.passForm.get('passVerify')?.value.length;

    if ( length1 >= 6  && length2 >= 6 ) {
      pass = this.passForm.get('password')?.value;
      passVerify = this.passForm.get('passVerify')?.value;
    }
    
    if (pass === passVerify) {
      this.samePassword = true;
      return false;
    }	else {  
      this.samePassword = false;
      return true;
    }
  }

}
