import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@core/services/auth.service';
import { AlertService } from 'src/app/@core/utils/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  public step1: boolean = true;
  public step2: boolean = false;
  public step3: boolean = false;
  public step4: boolean = false;
  public step5: boolean = false;
  public step6: boolean = false;

  public emailRegex: string ='^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

  public businessList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private alertSvc: AlertService,
    private router: Router,
    private authSvc: AuthService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.initForms();

    this.activeStep6();
  }

  nextStep2() {
    // validate email not empty
    if (this.loginForm.get('email')?.value === '') {
      this.alertSvc.showAlert(3, '', 'Email is required');
      return;
    }
    this.step1 = false;
    this.step2 = true;
  } 

  backStep2() {
    this.step2 = true;
    this.step3 = false;
    this.step4 = false;
    this.step5 = false;
  }

  nextStep3(opt: number) {
    // move to step 3
    if ( opt === 1 ) {
      this.step2 = false;
      this.step3 = true;
    }
    // move to step 4
    if ( opt === 2 ) {
      this.step2 = false;
      this.step4 = true;
    }
    // move to step 5
    if ( opt === 3 ) {
      this.step2 = false;
      this.step5 = true;
    }
  }

  // before login, selected business
  activeStep6() {
    this.step1 = true;
    this.step2 = false;
    this.step3 = false;
    this.step4 = false;
    this.step5 = false;
    this.step6 = false;
  }

  // create business
  createBusiness() {
    this.router.navigate(['/auth/create-business']);
  }

  async submit() {
    // login by password
    if ( this.step3 ) {
      let resp = await this.authSvc.login(this.loginForm.value);
      if ( resp ) {
        // set identity in localstorage
        localStorage.setItem('identity', JSON.stringify(resp));
        this.businessList = resp.businessList || [];

        // move to step 6
        this.step3 = false;
        this.step6 = true;
      }
    }
  }

  nextHome(item: any) {
    // set business in localstorage
    localStorage.setItem('businessSelected', JSON.stringify(item));
    this.router.navigate(['/pages/home']);
  }

  /* SECTION VALIDATIONS */
  validInput(name: string) {
    return this.loginForm.get(name)?.touched && this.loginForm.get(name)?.errors?.['required'];
  }

  validInputMin(name: string) {
    return this.loginForm.get(name)?.touched && this.loginForm.get(name)?.errors?.['minlength'];
  }

  validInputMax(name: string) {
    return this.loginForm.get(name)?.touched && this.loginForm.get(name)?.errors?.['maxlength'];
  }

  validEmail(name: string) {
    return this.loginForm.get(name)?.touched && this.loginForm.get(name)?.errors?.['pattern'];
  }

  initForms(): FormGroup {
    return this.fb.group({
      email: ['rcalero@gmail.com', {
        validators: [
          Validators.required,
          Validators.pattern(this.emailRegex),
        ],
        updateOn: 'blur'
      }],
      password: ['1234', [Validators.required, Validators.minLength(4) ]],
      codeMail: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5) ]],
      codePhone: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5) ]],
    })
  }

}
