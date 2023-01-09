import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../@theme/theme.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ModalDeleteComponent } from './components/modal-delete/modal-delete.component';
import { SendMessageComponent } from './components/send-message/send-message.component';
import { RechargeComponent } from './components/recharge/recharge.component';
import { ValidateNewUserComponent } from './components/validate-new-user/validate-new-user.component';
import { NgxMaskModule } from 'ngx-mask';



@NgModule({
  declarations: [
    ModalDeleteComponent,
    ChangePasswordComponent,
    SendMessageComponent,
    RechargeComponent,
    ValidateNewUserComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ThemeModule,
    NgxMaskModule.forRoot(),
  ],
  exports:[
    ModalDeleteComponent,
    ChangePasswordComponent,
    SendMessageComponent,
    RechargeComponent,
    ValidateNewUserComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
