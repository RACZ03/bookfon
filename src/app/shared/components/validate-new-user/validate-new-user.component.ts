import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/@core/services/users.service';
import { AlertService } from 'src/app/@core/utils/alert.service';

@Component({
  selector: 'app-validate-new-user',
  templateUrl: './validate-new-user.component.html',
  styleUrls: ['./validate-new-user.component.scss']
})
export class ValidateNewUserComponent implements OnInit {

  public modalValidate!: FormGroup
  public emailRegex: string ='^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

  @Input() title: string = '';
  @Input() showSettings: boolean = false;
  @Output() onCloseModalAndOpenOld = new EventEmitter<boolean>();

  public step1: boolean = true;
  public step2: boolean = false;

  constructor(
    private fb: FormBuilder,
    private alertSvc: AlertService,
    private userSvc: UsersService
  ) { }

  ngOnInit(): void {
    this.modalValidate = this.initForm();
  }

  validInput(input: string): boolean {
    return this.modalValidate.get(input)?.invalid && this.modalValidate.get(input)?.touched ? true : false;
  }

  validInputMin(name: string) {
    return this.modalValidate.get(name)?.touched && this.modalValidate.get(name)?.errors?.['minlength'];
  }

  validEmail(name: string) {
    return this.modalValidate.get(name)?.touched && this.modalValidate.get(name)?.errors?.['pattern'];
  }

  initForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      role: [''],
    })
  }

  async onSubmit() {

    let role = this.modalValidate.get('role')?.value;
    if ( this.showSettings ) {
      // is true, validate idRole
      if ( role === '' ) {
        this.alertSvc.showAlert(3, '', 'Please select a role');
        return;
      }
    }

    let email = this.modalValidate.get('email')?.value;
    let phone = this.modalValidate.get('phone')?.value;

    let resp = await this.userSvc.verifyUser(email, phone, role);
    console.log(resp);
    // this.step1 = false;
    // this.step2 = true;

  }

  cancelAndOpenOldModal() {

    this.onCloseModalAndOpenOld.emit(true);

    this.step1 = true;
    this.step2 = false;
  }
 
  close() {
    this.onCloseModalAndOpenOld.emit(false);
  }
}
