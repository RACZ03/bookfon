import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/@core/utils/alert.service';

@Component({
  selector: 'app-create-business',
  templateUrl: './create-business.component.html',
  styleUrls: ['./create-business.component.scss']
})
export class CreateBusinessComponent implements OnInit {

  public createForm!: FormGroup;
  
  public step1: boolean = true;
  public step2: boolean = false;
  public step3: boolean = false;

  constructor(
    private fb: FormBuilder,
    private alertSvc: AlertService,
    private router: Router,
  ) { 
  }

  ngOnInit(): void {
    this.createForm = this.initForms();
  }

  submit() {

    this.openStep2();
  }

  openStep2() {
    this.step1 = false;
    this.step2 = true;
  }

  openStep3() {
    // validate name not empty
    if (this.createForm.get('name')?.value === '') {
      this.alertSvc.showAlert(3, '', 'Name is required');
      return;
    }


    this.step2 = false;
    this.step3 = true;
  }

  validInput(name: string) {
    return this.createForm.get(name)?.touched && this.createForm.get(name)?.errors?.['required'];
  }

  validInputMin(name: string) {
    return this.createForm.get(name)?.touched && this.createForm.get(name)?.errors?.['minlength'];
  }

  validInputMax(name: string) {
    return this.createForm.get(name)?.touched && this.createForm.get(name)?.errors?.['maxlength'];
  }

  initForms(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      legalBusiness: [false]
    })
  }

  goBack() {
    this.step1 = true;
    this.step2 = false;
    this.step3 = false;
  }
}
