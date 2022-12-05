import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../@theme/theme.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ModalDeleteComponent } from './components/modal-delete/modal-delete.component';
import { SendMessageComponent } from './components/send-message/send-message.component';



@NgModule({
  declarations: [
    ModalDeleteComponent,
    ChangePasswordComponent,
    SendMessageComponent,
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
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
