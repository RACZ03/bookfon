import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/@core/services/users.service';
import { AlertService } from 'src/app/@core/utils/alert.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  passForm!: FormGroup;
  public id!: number;
  @Input() title = 'Change Password';
  @Input() showUser = false;
  @Input() set setId (id: any) {
    this.id = id;
    
  };
  @Output() changePass: EventEmitter<boolean> = new EventEmitter<boolean>();

  public fieldTextType: boolean = true;
  public fieldTextType2: boolean = true;
  public samePassword: boolean = false;
  public disabled: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
    private userSvc: UsersService,
    private alertSvc: AlertService
  ) { }

  ngOnInit(): void {
    this.passForm = this.initForms();
  }

  changeType(input: any) {
    if ( input !== undefined ) 
      input.type = input.type === 'password' ? 'text' : 'password';

    this.fieldTextType = !this.fieldTextType;
    const icon = document.getElementById('icon1');

    if ( this.fieldTextType ) {
      icon?.classList.remove('fa-eye-slash');
      icon?.classList.add('fa-eye');
    } else {
      icon?.classList.remove('fa-eye');
      icon?.classList.add('fa-eye-slash');
    }
  }

  changeType2(input: any) {
    if ( input !== undefined ) 
      input.type = input.type === 'password' ? 'text' : 'password';

    this.fieldTextType = !this.fieldTextType;
    const icon = document.getElementById('icon2');

    if ( this.fieldTextType ) {
      icon?.classList.remove('bi bi-eye-slash');
      icon?.classList.add('bi bi-eye');
    } else {
      icon?.classList.remove('bi bi-eye');
      icon?.classList.add('bi bi-eye-slash');
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
    console.log( this.passForm.invalid);
    if ( this.passForm.invalid ){ 
      return
    }
    let pass = this.passForm.get('password')?.value;
    let resp = await this.userSvc.changePassword(this.id, pass );
    if ( resp ) {
      this.alertSvc.showAlert(1, 'Success', 'Updated password');
      this.changePass.emit(true);
    } else {
      this.alertSvc.showAlert(4, 'Error', 'Could not update password');
    }
  }

  onClose() {
    this.changePass.emit(false);
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

  returnTo() {
    this.changePass.emit(false);
  }
}

