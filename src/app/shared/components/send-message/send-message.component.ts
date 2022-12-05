import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SendMessageService } from 'src/app/@core/services/send-message.service';
import { AlertService } from 'src/app/@core/utils/alert.service';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss']
})
export class SendMessageComponent implements OnInit {

  public title: string = 'Send Message';

  messageForm!: FormGroup;
  @Output() changePass: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private readonly fb: FormBuilder,
    private smsSvc: SendMessageService,
    private alertSvc: AlertService
  ) { }

  ngOnInit(): void {
    this.messageForm = this.initForms();
  }

  validInput(name: string) {
    return this.messageForm.get(name)?.touched && this.messageForm.get(name)?.errors?.['required'];
  }

  validInputMin(name: string) {
    return this.messageForm.get(name)?.touched && this.messageForm.get(name)?.errors?.['minlength'];
  }

  validInputMax(name: string) {
    return this.messageForm.get(name)?.touched && this.messageForm.get(name)?.errors?.['maxlength'];
  }

  initForms(): FormGroup {
    return this.fb.group({
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)] ],
      message: ['', [Validators.required] ],
    })
  }

  selectDefault() {
    this.resetForm(true);
  }

  resetForm(obj: boolean) {
    this.messageForm.reset({
      phone: (obj == false) ? '' : '12345678',
      passVerify: (obj == false ) ? '' : '12345678',
    }); 
  }


  async onSubmit() {
    console.log('hi')
    if ( this.messageForm.invalid ) 
      return

    let number = this.messageForm.get('phone')?.value;
    let message = this.messageForm.get('message')?.value;
    let resp = await this.smsSvc.sms(number, message);
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

  returnTo() {
    this.changePass.emit(false);
  }

}
