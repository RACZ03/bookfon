import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/@core/utils/alert.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  public createForm!: FormGroup;

  public emailRegex: string ='^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  
  constructor(
    private fb: FormBuilder,
    private alertSvc: AlertService,
  ) { }

  ngOnInit(): void {
    this.createForm = this.initForms();
  }


  submit() {
    this.alertSvc.showAlert(1, '', 'Bienvenido a Bookfon');
  }

  /* SECTION VALIDATIONS */
  validInput(name: string) {
    return this.createForm.get(name)?.touched && this.createForm.get(name)?.errors?.['required'];
  }

  validInputMin(name: string) {
    return this.createForm.get(name)?.touched && this.createForm.get(name)?.errors?.['minlength'];
  }

  validInputMax(name: string) {
    return this.createForm.get(name)?.touched && this.createForm.get(name)?.errors?.['maxlength'];
  }

  validEmail(name: string) {
    return this.createForm.get(name)?.touched && this.createForm.get(name)?.errors?.['pattern'];
  }

  initForms(): FormGroup {
    return this.fb.group({
      email: ['', {
        validators: [
          Validators.required,
          Validators.pattern(this.emailRegex),
        ],
        updateOn: 'blur'
      }],
      password: ['', [Validators.required, Validators.minLength(6) ]],
      phone_number: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    })
  }

}
