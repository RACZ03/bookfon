import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.scss']
})
export class RechargeComponent implements OnInit {

  rechargeForm!: FormGroup;
  public title: string = 'Wallet Top-up';

  constructor(
    private readonly fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.rechargeForm = this.initForms();
  }

  onSubmit() {

  }

  validInput(name: string) {
    return this.rechargeForm.get(name)?.touched && this.rechargeForm.get(name)?.errors?.['required'];
  }
  
  initForms(): FormGroup {
    return this.fb.group({
      parmentAmount: ['', [Validators.required]],
      cashBackAmount: ['', [Validators.required]],
    })
  }
}
