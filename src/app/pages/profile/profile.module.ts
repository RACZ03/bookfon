import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralComponent } from './general/general.component';
import { SecurtyComponent } from './securty/securty.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ReactiveFormsModule } from '@angular/forms';


import { NgxMaskModule, IConfig } from 'ngx-mask';
export const options: Partial<null|IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    GeneralComponent,
    SecurtyComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
  ]
})
export class ProfileModule { }
