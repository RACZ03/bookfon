import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public step1: boolean = true;
  public step2: boolean = false;
  public step3: boolean = false;
  public step4: boolean = false;
  public step5: boolean = false;
  public step6: boolean = false;
  public step7: boolean = false;
  public step8: boolean = false;
  public step9: boolean = false;
  public step10: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onContinue() {
    this.step1 = false;
    this.step2 = true;
  }
}
