import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../@theme/theme.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ModalDeleteComponent } from './components/modal-delete/modal-delete.component';
import { SendMessageComponent } from './components/send-message/send-message.component';
import { RechargeComponent } from './components/recharge/recharge.component';



@NgModule({
  declarations: [
    ModalDeleteComponent,
    ChangePasswordComponent,
    SendMessageComponent,
    RechargeComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ThemeModule
  ],
  exports:[
    ModalDeleteComponent,
    ChangePasswordComponent,
    SendMessageComponent,
    RechargeComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
